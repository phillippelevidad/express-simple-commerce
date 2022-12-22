# Features

- React-like hooks (`useCurrentUser`, `useCurrentTenant` and others), backed by Node's new [Asynchronous Context Tracking](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
- Dependency Injection with Inversify JS, customized to support per-request containers
- Use of pub/sub pattern to propagate changes across domains without tight-coupling them together
- Multi-tenancy

---

Inspect `src/index.js` and go from there.

You'll need to provide an `.env` file with a MongoDB URI. Use `.env.example` as a starting point.

The code is like 90% documented to help you through.

---

### References:

- [Per HTTP request Container with InversifyJS](https://phillcode.io/per-http-request-container-with-inversifyjs)
- [Simple Context Passing With AsyncLocalStorage in Node.js](https://codeandpepper.com/asynclocalstorage-in-node-js/)
