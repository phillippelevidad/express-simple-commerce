import { WithVersionProps } from "services/common/fields/version/WithVersionProps";

/**
 * Properties of an aggregate root. Includes:
 * - tenantId
 * - createdBy
 * - updatedBy
 */
export interface AggregateRootProps extends WithVersionProps {
  tenantId?: string;
  createdBy?: string;
  updatedBy?: string;
}
