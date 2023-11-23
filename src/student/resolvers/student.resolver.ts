import { LessonService } from './../../lesson/services/lesson.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentType } from '../types/student.type';
import { StudentService } from '../services/student.service';
import { CreateStudentInput } from '../inputs/create-student.input';
import { Student } from '../student.entity';
import { Lesson } from 'src/lesson/lesson.entity';
import { AssignLessonsToStudentInput } from '../inputs/assign-lessons-to-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    public studentService: StudentService,
    public lessonService: LessonService,
  ) {}

  @Query(() => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Mutation(() => StudentType)
  assignLessonsToStudent(
    @Args('assignLessonsToStudentInput')
    assignLessonsToStudentInput: AssignLessonsToStudentInput,
  ) {
    const { studentId, lessonIds } = assignLessonsToStudentInput;

    return this.studentService.assignLessonsToStudent(studentId, lessonIds);
  }

  @ResolveField()
  async lessons(@Parent() student: Student): Promise<Lesson[]> {
    return this.lessonService.getManyLessonsById(student.lessons);
  }
}
