import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTagInput, TagDto, UpdateTagInput } from './tags.dto';

/**
 * Main controller for tags
 */
@Controller('tags')
@ApiTags('tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({
    operationId: 'getAllTags',
    description: 'Find all tags',
  })
  @Get('')
  getAllTags(): Promise<TagDto[]> {
    return this.tagsService.getAllTags();
  }

  @ApiOperation({
    operationId: 'getTagById',
    description: 'Find a tag by id',
  })
  @Get(':id')
  getTagById(@Param('id') id: string): Promise<TagDto> {
    return this.tagsService.getTag(id);
  }

  @ApiBody({ type: CreateTagInput })
  @ApiOperation({
    operationId: 'createTag',
    description: 'Create a tag',
  })
  @Post('')
  createTag(@Body() tag: CreateTagInput): Promise<TagDto> {
    return this.tagsService.createTag(tag);
  }

  @ApiBody({ type: UpdateTagInput })
  @ApiOperation({
    operationId: 'updateTagById',
    description: 'Update a tag by id and body',
  })
  @Put(':id')
  updateTagById(
    @Param('id') id: string,
    @Body() tag: UpdateTagInput,
  ): Promise<TagDto> {
    return this.tagsService.updateTag(id, tag);
  }

  @ApiOperation({
    operationId: 'deleteTagById',
    description: 'Delete a tag by id',
  })
  @Delete(':id')
  deleteTagById(@Param('id') id: string): Promise<void> {
    return this.tagsService.deleteTag(id);
  }
}
