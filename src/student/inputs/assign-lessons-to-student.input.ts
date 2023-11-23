import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignLessonsToStudentInput {
  @IsUUID()
  @Field(() => ID)
  studentId: string;

  @IsUUID('all', { each: true })
  @Field(() => [ID])
  lessonIds: string[];
}
