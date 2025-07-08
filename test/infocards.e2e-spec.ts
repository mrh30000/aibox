
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { InfoCardEntity } from '../src/entities/infocard.entity';
import { disconnect } from 'mongoose';

describe('InfoCardsController (E2E)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let infoCardId: string;

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

  const testInfoCard: Partial<InfoCardEntity> = {
    title: 'Test Info Card',
    description: 'A card for E2E testing purposes.',
    targetAudience: 'Developers',
    displayOrder: 1,
  };

  it('/api/infocards (POST) - should create a new info card', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/infocards')
      .send(testInfoCard)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.title).toEqual(testInfoCard.title);
    expect(response.body._id).toBeDefined();
    infoCardId = response.body._id; // Save for later tests
  });

  it('/api/infocards (GET) - should get all info cards', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/infocards')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const foundInfoCard = response.body.find((card: any) => card._id === infoCardId);
    expect(foundInfoCard).toBeDefined();
    expect(foundInfoCard.title).toEqual(testInfoCard.title);
  });

  it('/api/infocards/:id (GET) - should get a specific info card by ID', async () => {
    if (!infoCardId) {
      throw new Error('Info Card ID not set from POST test');
    }
    const response = await request(app.getHttpServer())
      .get(`/api/infocards/${infoCardId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(infoCardId);
    expect(response.body.title).toEqual(testInfoCard.title);
  });

  it('/api/infocards/:id (PUT) - should update an info card', async () => {
    if (!infoCardId) {
      throw new Error('Info Card ID not set from POST test');
    }
    const updatedTitle = 'Updated Test Info Card';
    const updatePayload = { ...testInfoCard, title: updatedTitle, displayOrder: 2 };

    const response = await request(app.getHttpServer())
      .put(`/api/infocards/${infoCardId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(infoCardId);
    expect(response.body.title).toEqual(updatedTitle);
    expect(response.body.displayOrder).toEqual(2);
  });

  it('/api/infocards/:id (DELETE) - should delete an info card', async () => {
    if (!infoCardId) {
      throw new Error('Info Card ID not set from POST test');
    }
    await request(app.getHttpServer())
      .delete(`/api/infocards/${infoCardId}`)
      .expect(200);

    // Verify it's deleted
    await request(app.getHttpServer()).get(`/api/infocards/${infoCardId}`).expect(404);
  });

  it('/api/infocards/:id (GET) - should return 404 for non-existent info card', async () => {
    const nonExistentId = '605c72ef293492001e729000';
    await request(app.getHttpServer())
      .get(`/api/infocards/${nonExistentId}`)
      .expect(404);
  });
});
