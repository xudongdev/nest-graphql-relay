import { Field, ObjectType } from "@nestjs/graphql";
import { ConnectionCursor } from "graphql-relay";
import * as Relay from "graphql-relay";

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: ConnectionCursor;

  @Field({ nullable: true })
  endCursor?: ConnectionCursor;
}
