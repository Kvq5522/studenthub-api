import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, IsNull, Not } from 'typeorm';
import { PaginationResult, genPaginationResult } from 'src/shared/dtos/common.dtos';
import { HttpRequestContextService } from 'src/shared/http-request-context/http-request-context.service';
import { Proposal } from 'src/modules/proposal/proposal.entity';
import { ProposalResDto } from 'src/modules/proposal/dto/proposal-res.dto';
import { ProposalFindArgs } from 'src/modules/proposal/dto/proposal-find-args.dto';
import { ProposalCreateDto } from 'src/modules/proposal/dto/proposal-create.dto';
import { ProposalUpdateDto } from 'src/modules/proposal/dto/proposal-update.dto';
import { Project } from 'src/modules/project/project.entity';
import { NotificationService } from 'src/modules/notification/notification.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventGateway } from 'src/modules/event/event.gateway';
import { Student } from 'src/modules/student/student.entity';
import { Company } from 'src/modules/company/company.entity';
import { User } from 'src/modules/user/user.entity';
import { NotifyFlag, StatusFlag, TypeNotifyFlag } from 'src/common/common.enum';
import { StudentProfileService } from 'src/modules/student/student.service';

@Injectable()
export class ProposalService {
  private readonly logger = new Logger(ProposalService.name);
  constructor(
    @InjectRepository(Proposal)
    private proposalRepository: Repository<Proposal>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly httpContext: HttpRequestContextService,
    private eventGateway: EventGateway,
    private notificationService: NotificationService,
    private studentProfileService: StudentProfileService
  ) { }

  async searchProjectId(projectId: number | string, args: ProposalFindArgs): Promise<PaginationResult<ProposalResDto>> {
    const { limit, offset, statusFlag } = args;

    const record = this.proposalRepository.createQueryBuilder('proposal');

    record
      .select([
        'proposal.id',
        'proposal.createdAt',
        'proposal.updatedAt',
        'proposal.deletedAt',
        'proposal.projectId',
        'proposal.studentId',
        'proposal.coverLetter',
        'proposal.statusFlag',
        'proposal.disableFlag',
      ])
      .where('proposal.project_id = :projectId', { projectId })
      .andWhere('proposal.deleted_at IS NULL')
      .leftJoinAndSelect('proposal.student', 'student')
      .leftJoinAndSelect('student.user', 'user', 'user.deleted_at IS NULL')
      .leftJoinAndSelect('student.techStack', 'techStack')
      .leftJoinAndSelect('student.educations', 'education');

    if (statusFlag) {
      record.andWhere('proposal.status_flag IN (:...statusFlag)', { statusFlag });
    }

    const [items, count] = await record
      .limit(limit || 10)
      .offset(offset || 0)
      .getManyAndCount();

    const resultItems = items.map((item) => {
      return {
        ...item,
        student: {
          ...item.student,
          user: {
            fullname: item?.student.user.fullname,
          },
        },
      };
    });

    return genPaginationResult(resultItems as any, count, args.offset, args.limit);
  }

  async findOne(id: string): Promise<ProposalResDto> {
    const proposal = await this.proposalRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: [
        'student',
        'student.techStack',
        'student.educations',
        'student.user',
        'student.skillSets',
        'student.experiences',
      ],
    });

    if (!proposal) {
      throw new NotFoundException(`Not found: proposalId = ${id}`);
    }

    (proposal.student as any).resumeLink = await this.studentProfileService.getResume(proposal.student.id as number);
    (proposal.student as any).transcriptLink = await this.studentProfileService.getTranscript(proposal.student.id as number);

    return proposal;
  }

  async createProposal(proposal: ProposalCreateDto): Promise<ProposalCreateDto> {
    const projectId = proposal.projectId;
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project || project.deletedAt != null) {
      throw new NotFoundException(`Project not found with id: ${projectId}`);
    }

    const checkProposal = await this.proposalRepository.findBy({ studentId: proposal.studentId, projectId: projectId });
    if (checkProposal.length > 0) {
      throw new ConflictException(`Proposal for project with ID ${projectId} already exists.`);
    }
    const newProposal = await this.proposalRepository.save(proposal);

    const studentId = proposal.studentId;

    const student = await this.studentRepository.findOneBy({ id: studentId });

    const companyId = project.companyId;

    const company = await this.companyRepository.findOneBy({ id: companyId });

    const sender = await this.userRepository.findOneBy({ id: student.userId });

    const notificationId = await this.notificationService.createNotification({
      receiverId: company.userId,
      senderId: student.userId,
      title: `New proposal from student ${sender.fullname} for project ${project.title}`,
      content: `New proposal from student ${sender.fullname} for project ${project.title}`,
      notifyFlag: NotifyFlag.Unread,
      typeNotifyFlag: TypeNotifyFlag.Submitted,
      messageId: null,
      proposalId: newProposal.id,
    });

    await this.eventGateway.sendNotification({
      notificationId: notificationId as string,
      receiverId: company.userId as string,
    });

    return newProposal;
  }

  async updateProposal(proposalId: number | string, proposal: ProposalUpdateDto): Promise<ProposalResDto> {
    let proposalToUpdate = await this.proposalRepository.findOne({
      where: { id: proposalId },
      relations: ['student', 'project'],
    });

    if (!proposalToUpdate) throw new Error('Proposal not found');

    proposalToUpdate = await this.proposalRepository.save({
      id: proposalId,
      ...proposalToUpdate,
      ...proposal,
    });

    // Get info for notification
    const studentInfo = await this.userRepository.findOneBy({ id: proposalToUpdate.student.userId });
    const projectInfo = await this.projectRepository.findOneBy({ id: proposalToUpdate.projectId });
    const company = await this.companyRepository.findOneBy({ id: proposalToUpdate.project.companyId });

    let notificationId, receiverId, senderId;

    switch (proposalToUpdate.statusFlag) {
      case StatusFlag.Offer:
        receiverId = studentInfo.id;
        senderId = company.userId;
        notificationId = await this.notificationService.createNotification({
          receiverId,
          senderId,
          title: `You have an OFFER!`,
          content: `You was offered by company ${company.companyName} for project ${projectInfo.title}`,
          notifyFlag: NotifyFlag.Unread,
          typeNotifyFlag: TypeNotifyFlag.Offer,
          messageId: null,
          proposalId: proposalId,
        });
        break;
      case StatusFlag.Hired:
        receiverId = company.userId;
        senderId = studentInfo.id;
        notificationId = await this.notificationService.createNotification({
          receiverId,
          senderId,
          title: `Candidate accepted your offer !`,
          content: `Proposal hired by student ${studentInfo.fullname} for project ${projectInfo.title}`,
          notifyFlag: NotifyFlag.Unread,
          typeNotifyFlag: TypeNotifyFlag.Hired,
          messageId: null,
          proposalId: proposalId,
        });
        break;
      default:
        break;
    }

    await this.eventGateway.sendNotification({
      receiverId: receiverId,
      notificationId: notificationId,
    });

    return proposalToUpdate;
  }

  async findByStudentId(studentId: string): Promise<ProposalResDto[]> {
    return this.proposalRepository.find({
      where: {
        student: {
          id: studentId,
        },
        deletedAt: null,
      },
    });
  }

  async findProjectByStudentId(studentId: number, args: ProposalFindArgs): Promise<Proposal[]> {
    const whereCondition: any = { studentId: studentId };

    if (Array.isArray(args.statusFlag) && args.statusFlag.length > 0) {
      whereCondition.statusFlag = In(args.statusFlag);
    }

    if (Array.isArray(args.typeFlag) && args.typeFlag.length > 0) {
      whereCondition.project = { typeFlag: In(args.typeFlag) };
    }

    whereCondition.project = { ...whereCondition.project, deletedAt: IsNull() };

    return this.proposalRepository.find({
      where: whereCondition,
      relations: ['project'],
    });
  }
}
