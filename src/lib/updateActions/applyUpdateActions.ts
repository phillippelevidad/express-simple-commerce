import { BadRequestError } from "lib/errors/BadRequestError";
import { NotFoundError } from "lib/errors/NotFoundError";
import { VersionMismatchError } from "lib/errors/VersionMismatchError";
import { UpdateActionHandlers } from "./UpdateActionHandlers";
import { UpdateActions } from "./UpdateActions";
import { WithVersion } from "./WithVersion";

export async function applyUpdateActions<TEntity extends WithVersion>(
  entitySelector: () => Promise<TEntity | null | undefined>,
  updateActions: UpdateActions,
  handlers: UpdateActionHandlers<TEntity>
): Promise<TEntity> {
  const entity = await entitySelector();

  if (!entity) throw new NotFoundError();

  if (entity.version !== updateActions.version)
    throw new VersionMismatchError();

  for (const updateAction of updateActions.actions) {
    if (!handlers[updateAction.action])
      throw new BadRequestError(`Invalid action: ${updateAction.action}`);

    const { action, payload } = updateAction;
    await Promise.resolve(handlers[action](entity, payload));
  }

  return entity;
}
