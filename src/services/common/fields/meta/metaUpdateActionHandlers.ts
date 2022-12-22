import { UpdateActionHandlers } from "lib/updateActions/UpdateActionHandlers";
import { WithMetaDocument } from "./WithMetaDocument";

export const metaUpdateActionHandlers: UpdateActionHandlers<WithMetaDocument> =
  {
    addMeta: (entity, meta) => {
      Object.entries(meta ?? {}).forEach(([key, value]) => {
        if (!value) return;
        entity.meta.set(key, String(value));
      });
    },
    setMeta: (entity, meta) => {
      entity.meta.clear();
      Object.entries(meta ?? {}).forEach(([key, value]) => {
        if (!value) return;
        entity.meta.set(key, String(value));
      });
    },
    removeMeta: (entity, keys) => {
      if (typeof keys === "string") keys = [keys];
      if (Array.isArray(keys)) {
        for (const key of keys) entity.meta.delete(key);
      }
    },
    clearMeta: (entity) => {
      entity.meta.clear();
    },
  };
