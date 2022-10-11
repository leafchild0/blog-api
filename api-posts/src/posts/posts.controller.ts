import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostInput, PostDto, UpdatePostInput } from './posts.dto';

/**
 * Main controller for posts
 */
@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    operationId: 'getAllPosts',
    description: 'Find all posts',
  })
  @Get('')
  getAllPosts(): Promise<PostDto[]> {
    // Ideally, need to pass filters here, but it's out of the scope of this project
    return this.postsService.getAllPosts({});
  }

  @ApiOperation({
    operationId: 'getPostById',
    description: 'Find a post by id',
  })
  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.getPost(id);
  }

  @ApiBody({ type: CreatePostInput })
  @ApiOperation({
    operationId: 'createPost',
    description: 'Create a post',
  })
  @Post('')
  createPost(@Body() post: CreatePostInput): Promise<PostDto> {
    return this.postsService.createPost(post);
  }

  @ApiBody({ type: UpdatePostInput })
  @ApiOperation({
    operationId: 'updatePostById',
    description: 'Update a post by id and body',
  })
  @Put(':id')
  updatePostById(
    @Param('id') id: string,
    @Body() post: UpdatePostInput,
  ): Promise<PostDto> {
    return this.postsService.updatePost(id, post);
  }

  @ApiOperation({
    operationId: 'deletePostById',
    description: 'Delete a post by id',
  })
  @Delete(':id')
  deletePostById(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
