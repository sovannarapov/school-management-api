import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentResolver } from './resolvers/student.resolver';
import { StudentService } from './services/student.service';
import { Student } from './student.entity';
import { LessonService } from 'src/lesson/services/lesson.service';
import { Lesson } from 'src/lesson/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Lesson])],
  providers: [StudentResolver, StudentService, LessonService],
  exports: [StudentService],
})
export class StudentModule {}
