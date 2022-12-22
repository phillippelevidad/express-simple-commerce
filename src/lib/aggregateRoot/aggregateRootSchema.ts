import mongoose from "mongoose";

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
