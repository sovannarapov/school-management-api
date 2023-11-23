import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LessonType } from 'src/lesson/types/lesson.type';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [LessonType])
  lessons: string[];
}
