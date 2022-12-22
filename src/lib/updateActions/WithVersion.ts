/**
 * Interface for entities with a version.
 * A version number is required to apply update actions to an entity.
 */
export interface WithVersion {
  version: number;
}
