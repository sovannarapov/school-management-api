import { StudentResolver } from './resolvers/student.resolver';
import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
