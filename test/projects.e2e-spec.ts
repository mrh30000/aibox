
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateProjectDto } from '../src/api/projects/projects.service';
import { disconnect } from 'mongoose';

describe('ProjectsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let projectId: string;

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

  const testProject: CreateProjectDto = {
    name: 'Test Project',
    description: 'A project for E2E testing purposes.',
    category: 'AI',
    projectUrl: 'http://testproject.example.com',
    status: 'in-development',
    isFeatured: false,
  };

  it('/api/projects (POST) - should create a new project', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/projects')
      .send(testProject)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(testProject.name);
    expect(response.body._id).toBeDefined();
    projectId = response.body._id; // Save for later tests
  });

  it('/api/projects (GET) - should get all projects', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/projects')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    const foundProject = response.body.data.find((p: any) => p._id === projectId);
    expect(foundProject).toBeDefined();
    expect(foundProject.name).toEqual(testProject.name);
  });

  it('/api/projects/:id (GET) - should get a specific project by ID', async () => {
    if (!projectId) {
      throw new Error('Project ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/projects/${projectId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(projectId);
    expect(response.body.name).toEqual(testProject.name);
  });

  it('/api/projects/:id (PUT) - should update a project', async () => {
    if (!projectId) {
      throw new Error('Project ID not set from POST test');
    }
    const updatedName = 'Updated Test Project';
    const updatePayload = { ...testProject, name: updatedName, isFeatured: true };

    const response = await request(app.getHttpServer())
      .put(`/api/projects/${projectId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(projectId);
    expect(response.body.name).toEqual(updatedName);
    expect(response.body.isFeatured).toEqual(true);
  });

  it('/api/projects/:id (DELETE) - should delete a project', async () => {
    if (!projectId) {
      throw new Error('Project ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/projects/${projectId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/projects/${projectId}`).expect(404);
  });

  it('/api/projects/:id (GET) - should return 404 for non-existent project', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/projects/${nonExistentId}`)
      .expect(404);
  });
});
