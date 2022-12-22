import { Request, Response, Router } from "express";
import { Category, CategoryDocument, CategoryProps } from "./model";
import { faker } from "@faker-js/faker";
import { NotFoundError } from "lib/errors/NotFoundError";
import { applyUpdateActions } from "lib/updateActions/applyUpdateActions";
import { UpdateActions } from "lib/updateActions/UpdateActions";
import { metaUpdateActionHandlers } from "services/common/fields/meta/metaUpdateActionHandlers";
import { createSlug } from "services/common/helpers/createSlug";
import { CategoryCreated } from "./events/CategoryCreated";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const limit = Math.max(1, Math.min(500, Number(req.query.limit) ?? 10));
  const offset = Math.max(0, Number(req.query.offset) ?? 0);

  const categories = await Category.find({}).skip(offset).limit(limit);
  const total = await Category.countDocuments({});

  res.status(200).json({
    data: categories,
    total,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new NotFoundError();
  res.status(200).json(category);
});

router.post("/", async (req: Request, res: Response) => {
  const props = req.body as CategoryProps;
  const category = Category.build(props);
  await category.save();
  res.status(201).json(category);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await applyUpdateActions<CategoryDocument>(
    () => Category.findById(id).exec(),
    req.body as UpdateActions,
    {
      ...metaUpdateActionHandlers,
      setName: (category, { name, setSlugFromName }) => {
        category.name = name;
        if (setSlugFromName) category.slug = createSlug(name);
      },
      setSlug: (category, { slug }) => {
        category.slug = slug;
      },
      setDescription: (category, { description }) => {
        category.description = description;
      },
    }
  );

  await category.save();
  res.status(200).json(category);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(204).send();
});

router.post("/create-random", async (req: Request, res: Response) => {
  const name = faker.commerce.department();
  const category = Category.build({
    name,
    slug: createSlug(name),
    description: faker.lorem.paragraph(),
  });
  category.addDomainEvent(new CategoryCreated(category));
  await category.save();
  res.status(201).json(category);
});
