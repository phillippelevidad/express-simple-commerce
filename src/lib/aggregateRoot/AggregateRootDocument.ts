import { WithVersionDocument } from "services/common/fields/version/WithVersionDocument";

/**
 * Properties of an aggregate root. Includes:
 * - tenantId
 * - createdBy
 * - updatedBy
 */
export interface AggregateRootDocument extends WithVersionDocument {
  tenantId: string;
  createdBy: string;
  updatedBy: string;
}
