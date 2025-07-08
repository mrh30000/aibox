import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This will serve index.html for any route not caught by other controllers
  // and not starting with /api (to protect API endpoints).
  // It also avoids serving index.html for files with extensions (e.g. .css, .js, .png).
  @Get('*') // This will catch all routes not handled by other controllers
  serveReactApp(@Res() res: Response) {
    // We still need to be careful not to catch API routes.
    // This is typically handled by the order of module registration in app.module.ts
    // or by using a more specific path if needed, e.g., '/app/*'
    res.sendFile(join(process.cwd(), 'dist', 'client', 'index.html'));
  }
}
