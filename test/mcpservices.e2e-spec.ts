
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateMCPServceDto } from '../src/api/mcpservices/mcpservices.service';
import { disconnect } from 'mongoose';

describe('MCPServicesController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let serviceId: string;

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

  const testService: CreateMCPServceDto = {
    name: 'Test MCP Service',
    description: 'A service for E2E testing purposes.',
    languageOrTech: 'TypeScript',
    isVerified: true,
  };

  it('/api/mcpservices (POST) - should create a new service', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/mcpservices')
      .send(testService)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(testService.name);
    expect(response.body._id).toBeDefined();
    serviceId = response.body._id; // Save for later tests
  });

  it('/api/mcpservices (GET) - should get all services', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/mcpservices')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    const foundService = response.body.data.find((s: any) => s._id === serviceId);
    expect(foundService).toBeDefined();
    expect(foundService.name).toEqual(testService.name);
  });

  it('/api/mcpservices/:id (GET) - should get a specific service by ID', async () => {
    if (!serviceId) {
      throw new Error('Service ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/mcpservices/${serviceId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(serviceId);
    expect(response.body.name).toEqual(testService.name);
  });

  it('/api/mcpservices/:id (PUT) - should update a service', async () => {
    if (!serviceId) {
      throw new Error('Service ID not set from POST test');
    }
    const updatedName = 'Updated Test MCP Service';
    const updatePayload = { ...testService, name: updatedName, isVerified: false };

    const response = await request(app.getHttpServer())
      .put(`/api/mcpservices/${serviceId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(serviceId);
    expect(response.body.name).toEqual(updatedName);
    expect(response.body.isVerified).toEqual(false);
  });

  it('/api/mcpservices/:id (DELETE) - should delete a service', async () => {
    if (!serviceId) {
      throw new Error('Service ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/mcpservices/${serviceId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/mcpservices/${serviceId}`).expect(404);
  });

  it('/api/mcpservices/:id (GET) - should return 404 for non-existent service', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/mcpservices/${nonExistentId}`)
      .expect(404);
  });
});
