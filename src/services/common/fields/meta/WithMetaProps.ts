/**
 * Use this to extend a ModelProps interface with a `meta` field.
 * @example
 * interface MyModelProps extends WithMetaProps { ... }
 */
export interface WithMetaProps {
  meta?: Record<string, string>;
}
