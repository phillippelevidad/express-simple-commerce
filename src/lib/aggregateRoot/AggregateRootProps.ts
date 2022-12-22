import { WithVersionProps } from "services/common/fields/version/WithVersionProps";

export interface AggregateRootProps extends WithVersionProps {
  tenantId?: string;
  createdBy?: string;
  updatedBy?: string;
}
