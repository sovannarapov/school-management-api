import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../lesson.entity';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from '../inputs/create-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly _lessonRepository: MongoRepository<Lesson>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this._lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this._lessonRepository.findOne({ where: { id } });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this._lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this._lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this._lessonRepository.findOne({
      where: {
        id: lessonId,
      },
    });

    lesson.students = [...lesson.students, ...studentIds];

    return this._lessonRepository.save(lesson);
  }

  async getManyLessonsById(lessonIds: string[]): Promise<Lesson[]> {
    return this._lessonRepository.find({
      where: {
        id: {
          $in: lessonIds ?? [],
        },
      },
    });
  }
}
