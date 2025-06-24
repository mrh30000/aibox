import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MCPServicesController } from './mcpservices.controller';
import { MCPServicesService } from './mcpservices.service';
import { MCPServce, MCPServceSchema } from '../../schemas/mcpservice.schema'; // Corrected class name

@Module({
  imports: [MongooseModule.forFeature([{ name: MCPServce.name, schema: MCPServceSchema }])],
  controllers: [MCPServicesController],
  providers: [MCPServicesService],
  exports: [MCPServicesService], // Export if needed by other modules (e.g. page rendering controllers)
})
export class MCPServicesModule {}
