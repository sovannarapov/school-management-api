import { Module } from '@nestjs/common';
import { LessonResolver } from './resolvers/lesson.resolver';
import { LessonService } from './services/lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
