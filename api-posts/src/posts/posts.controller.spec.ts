import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostInput } from './posts.dto';
import { databaseProviders } from '../db/db.provider';

const posts: CreatePostInput[] = [
  {
    name: 'whatever',
    body: 'Funny description',
  },
  {
    name: '',
    body: 'Funny description',
  },
];

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue({})
      .overrideProvider(databaseProviders)
      .useValue({})
      .compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('create post', () => {
    it('should create post with correct data passed', async () => {
      postsService.createPost = jest.fn().mockResolvedValue(posts[0]);
      const newPost = await postsController.createPost(posts[0]);
      expect(newPost).toEqual(posts[0]);
      expect(postsService.createPost).toHaveBeenCalledWith(posts[0]);
    });
  });

  describe('find posts', () => {
    it('should find all posts', async () => {
      postsService.getAllPosts = jest.fn().mockResolvedValue(posts);
      expect(await postsController.getAllPosts()).toBe(posts);
      expect(postsService.getAllPosts).toBeCalledWith({});
    });
  });

  describe('find post by id', () => {
    it('should find post by id', async () => {
      postsService.getPost = jest.fn().mockResolvedValue(posts[0]);
      expect(await postsController.getPostById('0')).toBe(posts[0]);
      expect(postsService.getPost).toBeCalledWith('0');
    });
  });

  describe('update post by id', () => {
    it('update find post by id', async () => {
      postsService.updatePost = jest.fn().mockResolvedValue(posts[0]);
      expect(await postsController.updatePostById('0', posts[0])).toBe(
        posts[0],
      );
      expect(postsService.updatePost).toBeCalledWith('0', posts[0]);
    });
  });

  describe('delete post by id', () => {
    it('should find post by id', async () => {
      postsService.deletePost = jest.fn();
      expect(await postsController.deletePostById('0')).toBe(undefined);
      expect(postsService.deletePost).toBeCalledWith('0');
    });
  });
});
