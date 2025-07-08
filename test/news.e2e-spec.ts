
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateNewsDto } from '../src/api/news/news.service';
import { disconnect } from 'mongoose';

describe('NewsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let newsId: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop();
    await disconnect();
  });

  const testNews: CreateNewsDto = {
    title: 'Test News Article',
    excerpt: 'This is a short excerpt for the test news article.',
    content: 'This is the full content of the test news article.',
    category: 'Technology',
    publishedAt: new Date(),
    imageUrl: 'http://example.com/news-image.jpg',
    tags: ['test', 'e2e', 'news'],
    author: 'Test Author',
    sourceUrl: 'http://example.com/news-source',
    isFeatured: false,
    views: 0,
  };

  it('/api/news (POST) - should create a new news article', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/news')
      .send(testNews)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.title).toEqual(testNews.title);
    expect(response.body._id).toBeDefined();
    newsId = response.body._id; // Save for later tests
  });

  it('/api/news (GET) - should get all news articles', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/news')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    const foundNews = response.body.data.find((n: any) => n._id === newsId);
    expect(foundNews).toBeDefined();
    expect(foundNews.title).toEqual(testNews.title);
  });

  it('/api/news/:id (GET) - should get a specific news article by ID', async () => {
    if (!newsId) {
      throw new Error('News ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/news/${newsId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(newsId);
    expect(response.body.title).toEqual(testNews.title);
  });

  it('/api/news/:id (PUT) - should update a news article', async () => {
    if (!newsId) {
      throw new Error('News ID not set from POST test');
    }
    const updatedTitle = 'Updated Test News Article';
    const updatePayload = { ...testNews, title: updatedTitle, isFeatured: true };

    const response = await request(app.getHttpServer())
      .put(`/api/news/${newsId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(newsId);
    expect(response.body.title).toEqual(updatedTitle);
    expect(response.body.isFeatured).toEqual(true);
  });

  it('/api/news/:id (DELETE) - should delete a news article', async () => {
    if (!newsId) {
      throw new Error('News ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/news/${newsId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/news/${newsId}`).expect(404);
  });

  it('/api/news/:id (GET) - should return 404 for non-existent news article', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/news/${nonExistentId}`)
      .expect(404);
  });
});
