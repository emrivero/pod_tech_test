/**
 * Combinations type
 */
export type Combinations<T extends string> =
  T extends `${infer P},${infer Rest}`
    ? P extends string
      ?
          | `${P}`
          | `${Rest}`
          | `${Combinations<`${Rest}`>}`
          | `${P},${Combinations<`${Rest}`>}`
      : never
    : T;
/**
 * Filter payload type.
 */
export type FilterPayload = Combinations<"active,inactive,suspended">;
