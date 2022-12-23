import mongoose from "mongoose";
import { AggregateRootDocument } from "lib/aggregateRoot/AggregateRootDocument";
import { AggregateRootProps } from "lib/aggregateRoot/AggregateRootProps";
import { aggregateRootSchema } from "lib/aggregateRoot/aggregateRootSchema";
import { configureAggregateRootSchema } from "lib/aggregateRoot/configureAggregateRootSchema";
import { DomainEvent } from "lib/events/DomainEvent";
import { useBuildAggregateRootProps } from "hooks/useBuildAggregateRootProps";
import { useRequestContext } from "hooks/useRequestContext";
import { WithMetaDocument } from "services/common/fields/meta/WithMetaDocument";
import { WithMetaProps } from "services/common/fields/meta/WithMetaProps";
import { withMetaSchema } from "services/common/fields/meta/withMetaSchema";
import { createSlug } from "services/common/helpers/createSlug";

export interface CategoryProps extends AggregateRootProps, WithMetaProps {
  name: string;
  slug?: string;
  description?: string;
}

export interface CategoryDocument
  extends AggregateRootDocument,
    WithMetaDocument,
    mongoose.Document {
  name: string;
  slug: string;
  description?: string;
  addDomainEvent(event: DomainEvent<CategoryDocument>): void;
}

export interface CategoryModel extends mongoose.Model<CategoryDocument> {
  build(props: CategoryProps): CategoryDocument;
}

const categorySchema = new mongoose.Schema(
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
    ...aggregateRootSchema,
    ...withMetaSchema,
  },
  {
    methods: {
      addDomainEvent(event: DomainEvent) {
        const key = `__domainEvents_${
          this.collection.collectionName
        }_${this.get("_id")}`;
        const [events, setEvents] = useRequestContext<DomainEvent[]>(key, []);
        setEvents([...events, event]);
      },
      getDomainEvents(): DomainEvent[] {
        const key = `__domainEvents_${
          this.collection.collectionName
        }_${this.get("_id")}`;
        const [events] = useRequestContext<DomainEvent[]>(key, []);
        return events;
      },
      clearDomainEvents() {
        const key = `__domainEvents_${
          this.collection.collectionName
        }_${this.get("_id")}`;
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

configureAggregateRootSchema(categorySchema);

categorySchema.statics.build = (props: CategoryProps) => {
  const buildAggregateRootProps = useBuildAggregateRootProps();

  return new Category({
    ...props,
    ...buildAggregateRootProps(),
    ...{
      slug: props.slug ?? createSlug(props.name),
    },
  });
};

export const Category = mongoose.model<CategoryDocument, CategoryModel>(
  "Category",
  categorySchema,
  "Categories"
);
