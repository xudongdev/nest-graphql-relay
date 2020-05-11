import {
  ArraySliceMetaInfo,
  ConnectionArguments,
  connectionFromArraySlice as relayConnectionFromArraySlice,
} from "graphql-relay";

import { Connection } from "../interfaces/connection.interface";

export function connectionFromArraySlice<T>(
  arraySlice: T[],
  args: ConnectionArguments,
  meta: ArraySliceMetaInfo
): Connection<T> {
  const connection = relayConnectionFromArraySlice<T>(arraySlice, args, meta);

  return { ...connection, totalCount: meta.arrayLength };
}
