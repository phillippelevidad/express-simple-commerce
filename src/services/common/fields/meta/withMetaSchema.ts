/**
 * Use this to extend a Mongoose Model with a `meta` field.
 * @example
 * const schema = new mongoose.Schema({
 *  fieldA: { ... },
 *  fieldB: { ... },
 *  ...withMetaSchema,
 * });
 */
export const withMetaSchema = {
  meta: {
    type: Map,
    of: String,
    default: {},
  },
};
