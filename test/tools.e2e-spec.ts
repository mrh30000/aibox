import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateToolDto } from '../src/api/tools/tools.service';
import { disconnect } from 'mongoose';

describe('ToolsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let toolId: string;

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

  const testTool: CreateToolDto = {
    name: 'Test Tool E2E',
    description: 'A tool for E2E testing purposes.',
    category: 'AI Test Category',
    websiteUrl: 'http://testtool.example.com',
    language: 'en',
    isFeatured: false,
  };

  it('/api/tools (POST) - should create a new tool', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/tools')
      .send(testTool)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(testTool.name);
    expect(response.body._id).toBeDefined();
    toolId = response.body._id; // Save for later tests
  });

  it('/api/tools (GET) - should get all tools', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/tools')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    const foundTool = response.body.data.find((t: any) => t._id === toolId);
    expect(foundTool).toBeDefined();
    expect(foundTool.name).toEqual(testTool.name);
  });

  it('/api/tools/:id (GET) - should get a specific tool by ID', async () => {
    if (!toolId) {
      throw new Error('Tool ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/tools/${toolId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(toolId);
    expect(response.body.name).toEqual(testTool.name);
  });

  it('/api/tools/:id (PUT) - should update a tool', async () => {
    if (!toolId) {
      throw new Error('Tool ID not set from POST test');
    }
    const updatedName = 'Updated Test Tool E2E';
    const updatePayload = { ...testTool, name: updatedName, isFeatured: true };

    const response = await request(app.getHttpServer())
      .put(`/api/tools/${toolId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(toolId);
    expect(response.body.name).toEqual(updatedName);
    expect(response.body.isFeatured).toEqual(true);
  });

  it('/api/tools/:id (DELETE) - should delete a tool', async () => {
    if (!toolId) {
      throw new Error('Tool ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/tools/${toolId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/tools/${toolId}`).expect(404);
  });

  it('/api/tools/:id (GET) - should return 404 for non-existent tool', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/tools/${nonExistentId}`)
      .expect(404);
  });
});
