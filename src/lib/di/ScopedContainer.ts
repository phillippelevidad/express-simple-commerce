import { Container, interfaces } from "inversify";

const DEFAULT_SCOPE_ID = "__default__";

export type PostConfigureAction = (container: Container) => void;

export type ScopedContainerCache = {
  [id: string]: Container;
};

/**
 * A scoped container is a container that is unique to a scope.
 * Commonly used to create a new container for each http request.
 */
export class ScopedContainer {
  private static _postConfigureActions: PostConfigureAction[] = [];
  private static readonly _instances: ScopedContainerCache = {};

  /**
   * Options object to use when creating a new container for a
   * scope ID.
   */
  static containerOptions: interfaces.ContainerOptions;

  /**
   * A global container instance, which enables truly
   * singleton instances when using a scoped container. All scoped
   * containers reference the global container as parent.
   */
  static globalContainer: Container;

  /**
   * Returns a @see Container that is unique to the specified scope.
   * If this is the first time getting the container for the scope, then a
   * new container will be created using the provided factory. Any post configure
   * actions will also be applied to the new container instance.
   * @param scopeId Any string to identify the scope (e.g. current request ID).
   * @returns A @see Container that is unique to the specified scope.
   */
  static for(scopeId = DEFAULT_SCOPE_ID): Container {
    let container = this._instances[scopeId];
    if (!container) {
      container = this.makeNewContainer();
      this._instances[scopeId] = container;
    }
    return container;
  }

  /**
   * Unbinds the @see Container (i.e. container.unbindAll()) and removes
   * it from the cache.
   * @param scopeId
   */
  static remove(scopeId = DEFAULT_SCOPE_ID): void {
    const container = this._instances[scopeId];
    if (!container) return;
    container.unbindAll();
    delete this._instances[scopeId];
  }

  /**
   * Runs the @method remove method on all instances.
   */
  static removeAll(): void {
    Object.keys(this._instances).forEach((key) => this.remove(key));
  }

  /**
   * Adds a post configure action.
   * @param fn A function that will be run everytime a new @see Container is created.
   * @returns The @see ScopedContainer itself, to allow chaining.
   */
  static postConfigure(fn: PostConfigureAction): ScopedContainer {
    this._postConfigureActions.push(fn);
    return this;
  }

  /**
   * Removes any post configure actions.
   */
  static resetPostConfigureActions(): void {
    this._postConfigureActions = [];
  }

  private static makeNewContainer(): Container {
    const container =
      this.globalContainer?.createChild(this.containerOptions) ??
      new Container(this.containerOptions);
    this._postConfigureActions.forEach((action) => action(container));
    return container;
  }
}
