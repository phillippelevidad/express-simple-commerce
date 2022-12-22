/**
 * Use this to extend a ModelDocument interface with a `meta` field.
 * @example
 * interface MyModelDocument extends WithMetaDocument { ... }
 */
export interface WithMetaDocument {
  meta: Map<string, string>;
}
