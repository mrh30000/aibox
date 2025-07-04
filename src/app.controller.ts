import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This will serve index.html for any route not caught by other controllers
  // and not starting with /api (to protect API endpoints).
  // It also avoids serving index.html for files with extensions (e.g. .css, .js, .png).
  @Get(/^\/(?!api|.*\.(css|js|png|jpg|jpeg|gif|ico|json|map)$).*$/) // Regex to exclude /api and common static file extensions
  serveReactApp(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'dist', 'client', 'index.html'));
  }
}
