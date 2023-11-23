import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  lessons: string[];
}
