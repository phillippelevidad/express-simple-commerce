import mongoose from "mongoose";
import { EventBus } from "lib/events/EventBus";
import { TOKENS as LIB_TOKENS } from "lib/TOKENS";
import { useCurrentTenant } from "hooks/useCurrentTenant";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useDbFilterByCurrentTenant } from "hooks/useDbFilterByCurrentTenant";
import { useDbFilterByCurrentUser } from "hooks/useDbFilterByCurrentUser";
import { useDbFilterDeletedRecords } from "hooks/useDbFilterDeletedRecords";
import { useDependency } from "hooks/useDependency";

/**
 * Configures an aggregate root for use with mongoose.
 * Adds the following features:
 * - Optimistic concurrency control (version field)
 * - Timestamps (createdAt, updatedAt fields)
 * - Tenant filtering
 * - User filtering
 * - Domain event publishing
 * - Soft delete
 * @param schema The mongoose schema to configure.
 */
export function configureAggregateRootSchema(schema: mongoose.Schema): void {
  schema.pre("save", function (next) {
    this.increment();
    return next();
  });

  autoFilterByTenantId(schema);
  autoFilterByCreatedBy(schema);
  autoFilterByDeletedAt(schema);
  autoSetUpdatedBy(schema);
  autoPublishDomainEvents(schema);

  schema.set("optimisticConcurrency", true);
  schema.set("versionKey", "version");
  schema.set("timestamps", true);
}

/**
 * Filters queries by the current tenant if `useDbFilterByCurrentTenant` is true.
 */
function autoFilterByTenantId(schema: mongoose.Schema): void {
  schema.pre(/^find/, function (next) {
    const [filterByTenant] = useDbFilterByCurrentTenant();
    if (filterByTenant) {
      const [tenant] = useCurrentTenant();
      this.where({ tenantId: tenant!.id });
    }
    return next();
  });
}

/**
 * Filters queries by the current user if `useDbFilterByCurrentUser` is true.
 */
function autoFilterByCreatedBy(schema: mongoose.Schema): void {
  schema.pre(/^find/, function (next) {
    const [filterByUser] = useDbFilterByCurrentUser();
    if (filterByUser) {
      const [user] = useCurrentUser();
      this.where({ createdBy: user!.id });
    }
    return next();
  });
}

/**
 * Sets the value of the `updatedBy` property to the current user on save.
 */
function autoSetUpdatedBy(schema: mongoose.Schema): void {
  schema.pre("save", function (next) {
    const [user] = useCurrentUser();
    this.set("updatedBy", user!.id);
    return next();
  });
}

/**
 * Filters queries by the `deletedAt` property if `useDbFilterDeletedRecords` is true.
 */
function autoFilterByDeletedAt(schema: mongoose.Schema): void {
  schema.pre(/^find/, function (next) {
    if (schema.paths.deletedAt) {
      const [filterDeleted] = useDbFilterDeletedRecords();
      if (filterDeleted) this.where({ deletedAt: null });
    }
    return next();
  });
}

/**
 * Publishes domain events to the event bus.
 */
function autoPublishDomainEvents(schema: mongoose.Schema): void {
  schema.post("save", function (doc) {
    if (!doc.getDomainEvents) return;
    const bus = useDependency<EventBus>(LIB_TOKENS.EventBus);
    const events = doc.getDomainEvents() ?? [];
    for (const event of events) bus.publish(event);
    doc.clearDomainEvents();
  });
}
