import mongoose from "mongoose";

/**
 * The base schema for all aggregate roots. Includes:
 * - tenantId
 * - createdBy
 * - updatedBy
 */
export const aggregateRootSchema = {
  tenantId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
};
