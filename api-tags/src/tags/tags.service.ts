import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTagInput,
  TagDocument,
  TagDto,
  UpdateTagInput,
} from './tags.dto';
import { FilterQuery, Model } from 'mongoose';

/**
 * Service for tags, contains all ops
 */
@Injectable()
export class TagsService {
  constructor(
    @Inject('Tag')
    private clientModel: Model<TagDocument>,
  ) {}

  async getAllTags(filters: FilterQuery<any>): Promise<TagDto[]> {
    // Filter should be passed as well
    const tags = await this.clientModel.find(filters);

    return tags.map((t) => this.convertToDto(t));
  }

  async getTag(id: string): Promise<TagDto> {
    const tag = await this.clientModel.findById(id);
    return this.convertToDto(tag);
  }

  async createTag(tag: CreateTagInput): Promise<TagDto> {
    const created = await this.clientModel.create(tag);
    return this.convertToDto(created);
  }

  async updateTag(id: string, tag: UpdateTagInput): Promise<TagDto> {
    const result = await this.clientModel.findOneAndUpdate({ id }, tag, {
      new: true,
    });
    return this.convertToDto(result);
  }

  async deleteTag(id: string): Promise<void> {
    await this.clientModel.deleteOne({ id });
  }

  private convertToDto(t: TagDocument): TagDto {
    return {
      id: t.id,
      name: t.name,
      description: t.description,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }
}
