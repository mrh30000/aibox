
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateMCPTutorialDto } from '../src/api/mcptutorials/mcptutorials.service';
import { disconnect } from 'mongoose';

describe('MCPTutorialsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let tutorialId: string;

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

  const testTutorial: CreateMCPTutorialDto = {
    title: 'Test MCP Tutorial',
    summary: 'A tutorial for E2E testing purposes.',
    imageUrl: 'http://testtutorial.example.com/image.jpg',
    externalTutorialUrl: 'http://testtutorial.example.com/tutorial',
    publishDate: new Date(),
    viewCount: 0,
    tags: ['test', 'e2e'],
  };

  it('/api/mcptutorials (POST) - should create a new tutorial', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/mcptutorials')
      .send(testTutorial)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.title).toEqual(testTutorial.title);
    expect(response.body._id).toBeDefined();
    tutorialId = response.body._id; // Save for later tests
  });

  it('/api/mcptutorials (GET) - should get all tutorials', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/mcptutorials')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    const foundTutorial = response.body.data.find((t: any) => t._id === tutorialId);
    expect(foundTutorial).toBeDefined();
    expect(foundTutorial.title).toEqual(testTutorial.title);
  });

  it('/api/mcptutorials/:id (GET) - should get a specific tutorial by ID', async () => {
    if (!tutorialId) {
      throw new Error('Tutorial ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/mcptutorials/${tutorialId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(tutorialId);
    expect(response.body.title).toEqual(testTutorial.title);
  });

  it('/api/mcptutorials/:id (PUT) - should update a tutorial', async () => {
    if (!tutorialId) {
      throw new Error('Tutorial ID not set from POST test');
    }
    const updatedTitle = 'Updated Test MCP Tutorial';
    const updatePayload = { ...testTutorial, title: updatedTitle, viewCount: 100 };

    const response = await request(app.getHttpServer())
      .put(`/api/mcptutorials/${tutorialId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(tutorialId);
    expect(response.body.title).toEqual(updatedTitle);
    expect(response.body.viewCount).toEqual(100);
  });

  it('/api/mcptutorials/:id (DELETE) - should delete a tutorial', async () => {
    if (!tutorialId) {
      throw new Error('Tutorial ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/mcptutorials/${tutorialId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/mcptutorials/${tutorialId}`).expect(404);
  });

  it('/api/mcptutorials/:id (GET) - should return 404 for non-existent tutorial', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/mcptutorials/${nonExistentId}`)
      .expect(404);
  });
});
