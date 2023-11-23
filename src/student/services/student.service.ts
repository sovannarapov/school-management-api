import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../student.entity';
import { MongoRepository } from 'typeorm';
import { CreateStudentInput } from '../inputs/create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly _studentRepository: MongoRepository<Student>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this._studentRepository.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this._studentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName, lessons } = createStudentInput;
    const student = this._studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
      lessons,
    });

    return this._studentRepository.save(student);
  }

  async assignLessonsToStudent(
    studentId: string,
    lessonIds: string[],
  ): Promise<Student> {
    const student = await this._studentRepository.findOne({
      where: {
        id: studentId,
      },
    });

    student.lessons = [...student.lessons, ...lessonIds];

    return this._studentRepository.save(student);
  }

  async getManyStudentsById(studentIds: string[]): Promise<Student[]> {
    return this._studentRepository.find({
      where: {
        id: {
          $in: studentIds ?? [],
        },
      },
    });
  }
}
