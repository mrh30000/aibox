import { Controller, Get, Res, Req, Next } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*') // Catch all GET requests
  serveReactApp(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const path = req.path;
    const spaPathRegex = /^\/(?!api|.*\.(css|js|png|jpg|jpeg|gif|ico|json|map)$).*$/;

    if (spaPathRegex.test(path)) {
      // If it's an SPA route, serve index.html
      res.sendFile(join(process.cwd(), 'dist', 'client', 'index.html'));
    } else {
      // Otherwise, let other handlers (like static file middleware or other controllers) take over
      // If this is the absolute last route, NestJS will 404 if 'next()' doesn't find anything.
      // This assumes static assets and API routes are already handled by their respective modules/middleware.
      next();
    }
  }
}
