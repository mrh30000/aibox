
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateCategoryDto } from '../src/api/categories/categories.service';
import { disconnect } from 'mongoose';

describe('CategoriesController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let categoryId: string;

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

  const testCategory: CreateCategoryDto = {
    name: 'Test Category',
    slug: 'test-category',
    description: 'A category for E2E testing purposes.',
  };

  it('/api/categories (POST) - should create a new category', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/categories')
      .send(testCategory)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(testCategory.name);
    expect(response.body._id).toBeDefined();
    categoryId = response.body._id; // Save for later tests
  });

  it('/api/categories (GET) - should get all categories', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/categories')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const foundCategory = response.body.find((c: any) => c._id === categoryId);
    expect(foundCategory).toBeDefined();
    expect(foundCategory.name).toEqual(testCategory.name);
  });

  it('/api/categories/:id (GET) - should get a specific category by ID', async () => {
    if (!categoryId) {
      throw new Error('Category ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/categories/${categoryId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(categoryId);
    expect(response.body.name).toEqual(testCategory.name);
  });

  it('/api/categories/:id (PUT) - should update a category', async () => {
    if (!categoryId) {
      throw new Error('Category ID not set from POST test');
    }
    const updatedName = 'Updated Test Category';
    const updatePayload = { ...testCategory, name: updatedName, slug: 'updated-test-category' };

    const response = await request(app.getHttpServer())
      .put(`/api/categories/${categoryId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(categoryId);
    expect(response.body.name).toEqual(updatedName);
    expect(response.body.slug).toEqual('updated-test-category');
  });

  it('/api/categories/:id (DELETE) - should delete a category', async () => {
    if (!categoryId) {
      throw new Error('Category ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/categories/${categoryId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/categories/${categoryId}`).expect(404);
  });

  it('/api/categories/:id (GET) - should return 404 for non-existent category', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/categories/${nonExistentId}`)
      .expect(404);
  });
});
