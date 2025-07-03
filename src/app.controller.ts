import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  serveReactApp(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'dist', 'client', 'index.html'));
  }
}
