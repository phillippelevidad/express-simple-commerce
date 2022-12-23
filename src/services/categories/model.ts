import { createModel, ModelDocument } from "lib/aggregateRoot/createModel";
import { createSlug } from "services/common/helpers/createSlug";

export type CategoryProps = {
  name: string;
  slug?: string;
  description?: string;
};

export type CategoryDocument = ModelDocument<CategoryProps>;

export const Category = createModel<CategoryProps>(
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
