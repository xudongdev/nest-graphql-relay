import { ConnectionCursor, fromGlobalId } from "graphql-relay";

import { ConnectionArgs } from "../dto/connection.args";

export enum PagingType {
  FORWARD = "forward",
  BACKWARD = "backward",
}

function getId(cursor: ConnectionCursor): number {
  return parseInt(fromGlobalId(cursor).id, 10);
}

function nextId(cursor: ConnectionCursor): number {
  return getId(cursor) + 1;
}

function pagingType(connectionArgs: ConnectionArgs): PagingType {
  const { first, last, after, before } = connectionArgs;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  if (isForwardPaging && isBackwardPaging) {
    if ((isForwardPaging && before) || (isBackwardPaging && after)) {
      throw new Error("paging must use either first/after or last/before");
    } else {
      throw new Error(
        "cursor-based pagination cannot be forwards AND backwards"
      );
    }
  }

  return isBackwardPaging ? PagingType.BACKWARD : PagingType.FORWARD;
}

export function getLimitAndOffset(
  connectionArgs: ConnectionArgs
): { limit: number; offset: number } {
  const { first, last, after, before } = connectionArgs;

  switch (pagingType(connectionArgs)) {
    case PagingType.FORWARD: {
      return {
        limit: first,
        offset: after ? nextId(after) : 0,
      };
    }
    case PagingType.BACKWARD: {
      let limit = last;
      let offset = getId(before) - last;

      if (offset < 0) {
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return { limit: 0, offset: 0 };
  }
}
