import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './schemas/team.schema';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private readonly teamModel: Model<Team>) {}

  async create(dto: CreateTeamDto): Promise<Team> {
    return this.teamModel.create(dto);
  }

  async findAllBySprint(sprintId: string): Promise<Team[]> {
    return this.teamModel.find({ sprintId }).exec();
  }

  async findOne(sprintId: string, teamId: string): Promise<Team> {
    const team = await this.teamModel.findOne({ sprintId, teamId }).exec();
    if (!team) throw new NotFoundException(`Équipe "${teamId}" introuvable pour le sprint "${sprintId}"`);
    return team;
  }

  async update(sprintId: string, teamId: string, dto: UpdateTeamDto): Promise<Team> {
    const updated = await this.teamModel
      .findOneAndUpdate({ sprintId, teamId }, { $set: dto }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Équipe "${teamId}" introuvable`);
    return updated;
  }

  async remove(sprintId: string, teamId: string): Promise<void> {
    const result = await this.teamModel.deleteOne({ sprintId, teamId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Équipe "${teamId}" introuvable`);
  }

  async removeAllBySprint(sprintId: string): Promise<void> {
    await this.teamModel.deleteMany({ sprintId }).exec();
  }
}
