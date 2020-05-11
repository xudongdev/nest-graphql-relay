import { Field, InputType } from "@nestjs/graphql";

import { Direction } from "../enums/direction.enum";

@InputType()
export class Ordering {
  @Field()
  sort: string;

  @Field(() => Direction, { nullable: true, defaultValue: Direction.ASC })
  direction?: Direction;
}
