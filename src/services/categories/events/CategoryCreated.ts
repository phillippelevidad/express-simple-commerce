import { DomainEvent } from "lib/events/DomainEvent";
import { CategoryDocument } from "../model";

export class CategoryCreated extends DomainEvent<CategoryDocument> {
  constructor(category: CategoryDocument) {
    super("CategoryCreated", "Category", category.id, category);
  }
}
