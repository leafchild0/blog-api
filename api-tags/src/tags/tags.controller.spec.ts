import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { CreateTagInput } from './tags.dto';
import { databaseProviders } from '../db/db.provider';

const tags: CreateTagInput[] = [
  {
    name: 'whatever',
    description: 'Funny description',
  },
  {
    name: '',
    description: 'Funny description',
  },
];

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    })
      .overrideProvider(TagsService)
      .useValue({})
      .overrideProvider(databaseProviders)
      .useValue({})
      .compile();

    tagsController = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('create tag', () => {
    it('should create tag with correct data passed', async () => {
      tagsService.createTag = jest.fn().mockResolvedValue(tags[0]);
      const newTag = await tagsController.createTag(tags[0]);
      expect(newTag).toEqual(tags[0]);
      expect(tagsService.createTag).toHaveBeenCalledWith(tags[0]);
    });
  });

  describe('find tags', () => {
    it('should find all tags', async () => {
      tagsService.getAllTags = jest.fn().mockResolvedValue(tags);
      expect(await tagsController.getAllTags()).toBe(tags);
      expect(tagsService.getAllTags).toBeCalledWith({});
    });
  });

  describe('find tag by id', () => {
    it('should find tag by id', async () => {
      tagsService.getTag = jest.fn().mockResolvedValue(tags[0]);
      expect(await tagsController.getTagById('0')).toBe(tags[0]);
      expect(tagsService.getTag).toBeCalledWith('0');
    });
  });

  describe('update tag by id', () => {
    it('update find tag by id', async () => {
      tagsService.updateTag = jest.fn().mockResolvedValue(tags[0]);
      expect(await tagsController.updateTagById('0', tags[0])).toBe(tags[0]);
      expect(tagsService.updateTag).toBeCalledWith('0', tags[0]);
    });
  });

  describe('delete tag by id', () => {
    it('should find tag by id', async () => {
      tagsService.deleteTag = jest.fn();
      expect(await tagsController.deleteTagById('0')).toBe(undefined);
      expect(tagsService.deleteTag).toBeCalledWith('0');
    });
  });
});
