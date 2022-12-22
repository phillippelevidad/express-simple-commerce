import { WithVersionDocument } from "services/common/fields/version/WithVersionDocument";

export interface AggregateRootDocument extends WithVersionDocument {
  tenantId: string;
  createdBy: string;
  updatedBy: string;
}
