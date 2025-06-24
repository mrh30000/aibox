import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MCPTutorialsController } from './mcptutorials.controller';
import { MCPTutorialsService } from './mcptutorials.service';
import { MCPTutorial, MCPTutorialSchema } from '../../schemas/mcptutorial.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MCPTutorial.name, schema: MCPTutorialSchema }])],
  controllers: [MCPTutorialsController],
  providers: [MCPTutorialsService],
  exports: [MCPTutorialsService], // Export if needed
})
export class MCPTutorialsModule {}
