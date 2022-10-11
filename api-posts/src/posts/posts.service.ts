import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePostInput,
  PostDocument,
  PostDto,
  UpdatePostInput,
} from './posts.dto';
import { FilterQuery, Model } from 'mongoose';

/**
 * Service for post, contains all ops
 */
@Injectable()
export class PostsService {
  constructor(
    @Inject('Post')
    private clientModel: Model<PostDocument>,
  ) {}

  async getAllPosts(filters: FilterQuery<any>): Promise<PostDto[]> {
    // Filter should be passed as well
    const posts = await this.clientModel.find(filters);

    return posts.map((t) => this.convertToDto(t));
  }

  async getPost(id: string): Promise<PostDto> {
    const post = await this.clientModel.findById(id);
    return this.convertToDto(post);
  }

  async createPost(post: CreatePostInput): Promise<PostDto> {
    const created = await this.clientModel.create(post);
    return this.convertToDto(created);
  }

  async updatePost(id: string, post: UpdatePostInput): Promise<PostDto> {
    const result = await this.clientModel.findOneAndUpdate({ id }, post, {
      new: true,
    });
    return this.convertToDto(result);
  }

  async deletePost(id: string): Promise<void> {
    await this.clientModel.deleteOne({ id });
  }

  private convertToDto(t: PostDocument): PostDto {
    return {
      id: t.id,
      name: t.name,
      body: t.body,
      tags: t.tags,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }
}
