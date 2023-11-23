import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResolver } from './resolvers/lesson.resolver';
import { LessonService } from './services/lesson.service';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/services/student.service';
import { Student } from 'src/student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student])],
  providers: [LessonResolver, LessonService, StudentService],
  exports: [LessonService],
})
export class LessonModule {}
