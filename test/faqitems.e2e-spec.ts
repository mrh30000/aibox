
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FAQItemEntity } from '../src/entities/faqitem.entity';
import { disconnect } from 'mongoose';

describe('FAQItemsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let faqItemId: string;

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

  const testFAQItem: Partial<FAQItemEntity> = {
    question: 'Test FAQ Question',
    answer: 'Test FAQ Answer',
    category: 'General',
    displayOrder: 1,
  };

  it('/api/faqitems (POST) - should create a new FAQ item', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/faqitems')
      .send(testFAQItem)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.question).toEqual(testFAQItem.question);
    expect(response.body._id).toBeDefined();
    faqItemId = response.body._id; // Save for later tests
  });

  it('/api/faqitems (GET) - should get all FAQ items', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/faqitems')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const foundFAQItem = response.body.find((item: any) => item._id === faqItemId);
    expect(foundFAQItem).toBeDefined();
    expect(foundFAQItem.question).toEqual(testFAQItem.question);
  });

  it('/api/faqitems/:id (GET) - should get a specific FAQ item by ID', async () => {
    if (!faqItemId) {
      throw new Error('FAQ Item ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/faqitems/${faqItemId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(faqItemId);
    expect(response.body.question).toEqual(testFAQItem.question);
  });

  it('/api/faqitems/:id (PUT) - should update an FAQ item', async () => {
    if (!faqItemId) {
      throw new Error('FAQ Item ID not set from POST test');
    }
    const updatedQuestion = 'Updated Test FAQ Question';
    const updatePayload = { ...testFAQItem, question: updatedQuestion, displayOrder: 2 };

    const response = await request(app.getHttpServer())
      .put(`/api/faqitems/${faqItemId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(faqItemId);
    expect(response.body.question).toEqual(updatedQuestion);
    expect(response.body.displayOrder).toEqual(2);
  });

  it('/api/faqitems/:id (DELETE) - should delete an FAQ item', async () => {
    if (!faqItemId) {
      throw new Error('FAQ Item ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/faqitems/${faqItemId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/faqitems/${faqItemId}`).expect(404);
  });

  it('/api/faqitems/:id (GET) - should return 404 for non-existent FAQ item', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/faqitems/${nonExistentId}`)
      .expect(404);
  });
});
