/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { DomainEvent } from "lib/events/DomainEvent";
import { useBuildAggregateRootProps } from "hooks/useBuildAggregateRootProps";
import { useRequestContext } from "hooks/useRequestContext";
import { WithMetaDocument } from "services/common/fields/meta/WithMetaDocument";
import { WithMetaProps } from "services/common/fields/meta/WithMetaProps";
import { withMetaSchema } from "services/common/fields/meta/withMetaSchema";
import { AggregateRootDocument } from "./AggregateRootDocument";
import { AggregateRootProps } from "./AggregateRootProps";
import { aggregateRootSchema } from "./aggregateRootSchema";
import { configureAggregateRootSchema } from "./configureAggregateRootSchema";

export type AugmentedModelProps<TModelProps> = TModelProps &
  AggregateRootProps &
  WithMetaProps;

export type ModelDocument<TModelProps> = AugmentedModelProps<TModelProps> &
  AggregateRootDocument &
  WithMetaDocument &
  mongoose.Document & {
    addDomainEvent(event: DomainEvent): void;
  };

export type Model<TModelProps> = mongoose.Model<ModelDocument<TModelProps>> & {
  build(props: AugmentedModelProps<TModelProps>): ModelDocument<TModelProps>;
};

/**
 * Options for `createModel()`.
 * @property buildProps A function that will be called before creating a new model. It will receive the properties passed to `Model.build()` and should return the properties that will be used to create the model.
 */
export interface CreateModelOptions {
  buildProps?: (props: any) => Partial<any>;
}

/**
 * Creates a mongoose model that can be used to operate on the database.
 * @param modelName Singular name of the model.
 * @param collectionName Name of the collection (plural name of the model).
 * @param mongooseSchemaProperties Properties of the mongoose schema. Will be passed as parameters to `new mongoose.Schema()`.
 * @param options Additional configurations for the schema, such as `buildProps`.
 * @returns A mongoose model.
 */
export function createModel<TModelProps>(
  modelName: string,
  collectionName: string,
  mongooseSchemaProperties: any,
  options: CreateModelOptions = {}
) {
  function domainEventsKey(entityId: string) {
    return `__domainEvents_${collectionName}_${entityId}`;
  }

  const schema = new mongoose.Schema(
    {
      ...mongooseSchemaProperties,
      ...aggregateRootSchema,
      ...withMetaSchema,
    },
    {
      methods: {
        addDomainEvent(event: DomainEvent) {
          const key = domainEventsKey(this.get("_id"));
          const [events, setEvents] = useRequestContext<DomainEvent[]>(key, []);
          setEvents([...events, event]);
        },
        getDomainEvents(): DomainEvent[] {
          const key = domainEventsKey(this.get("_id"));
          const [events] = useRequestContext<DomainEvent[]>(key, []);
          return events;
        },
        clearDomainEvents() {
          const key = domainEventsKey(this.get("_id"));
          const [, setEvents] = useRequestContext<DomainEvent[]>(key, []);
          setEvents([]);
        },
      },
      toJSON: {
        transform(doc, ret) {
          const { _id, ...rest } = ret;
          return { id: _id, ...rest };
        },
      },
    }
  );

  configureAggregateRootSchema(schema);

  schema.statics.build = (props: AugmentedModelProps<TModelProps>) => {
    const buildAggregateRootProps = useBuildAggregateRootProps();
    return new Model({
      ...props,
      ...buildAggregateRootProps(),
      ...(options.buildProps && options.buildProps(props)),
    });
  };

  const Model = mongoose.model<DocumentType, Model<TModelProps>>(
    modelName,
    schema,
    collectionName
  );

  return Model;
}
