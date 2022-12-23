/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";
import { DomainEvent } from "lib/events/DomainEvent";
import { useBuildAggregateRootProps } from "hooks/useBuildAggregateRootProps";
import { useRequestContext } from "hooks/useRequestContext";
import { WithMetaDocument } from "services/common/fields/meta/WithMetaDocument";
import { WithMetaProps } from "services/common/fields/meta/WithMetaProps";
import { withMetaSchema } from "services/common/fields/meta/withMetaSchema";
import { createSlug } from "services/common/helpers/createSlug";
import { AggregateRootDocument } from "./AggregateRootDocument";
import { AggregateRootProps } from "./AggregateRootProps";
import { aggregateRootSchema } from "./aggregateRootSchema";
import { configureAggregateRootSchema } from "./configureAggregateRootSchema";

export const Category = createModel<{
  name: string;
  slug?: string;
  description?: string;
}>(
  "Category",
  "Categories",
  {
    name: {
      type: String,
      maxlength: 50,
      minlength: 3,
      required: true,
    },
    slug: {
      type: String,
      maxlength: 50,
      minlength: 3,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    buildProps: (props) => ({
      slug: props.slug ?? createSlug(props.name),
    }),
  }
);

export interface CreateModelOptions {
  buildProps?: (props: any) => Partial<any>;
}

export function createModel<TModelProps>(
  modelName: string,
  collectionName: string,
  mongooseSchemaProperties: any,
  options: CreateModelOptions = {}
) {
  type PropsType = TModelProps & AggregateRootProps & WithMetaProps;

  type DocumentType = PropsType &
    AggregateRootDocument &
    WithMetaDocument &
    mongoose.Document & {
      addDomainEvent(event: DomainEvent): void;
    };

  type ModelType = mongoose.Model<DocumentType> & {
    build(props: PropsType): DocumentType;
  };

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

  schema.statics.build = (props: PropsType) => {
    const buildAggregateRootProps = useBuildAggregateRootProps();
    return new Model({
      ...props,
      ...buildAggregateRootProps(),
      ...(options.buildProps && options.buildProps(props)),
    });
  };

  const Model = mongoose.model<DocumentType, ModelType>(
    modelName,
    schema,
    collectionName
  );

  return Model;
}
