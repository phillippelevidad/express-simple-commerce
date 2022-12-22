- React-like hooks (`useCurrentUser`, `useCurrentTenant` and others), backed by Node's new [Asynchronous Context Tracking](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
- Dependency Injection with Inversify JS, customized to support per-request containers
- Use of pub/sub pattern to propagate changes across domains without tight-coupling them together
- Multi-tenancy

Inspect `src/index.js` and go from there.

The code is like 90% documented to help you through.
