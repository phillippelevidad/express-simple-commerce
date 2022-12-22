import "lib/register";
import { ScopedContainer } from "lib/di/ScopedContainer";
import { ConcreteTestDependency } from "./dependencies/ConcreteTestDependency";
import { TestDependency } from "./dependencies/TestDependency";
import { TOKENS } from "./TOKENS";

ScopedContainer.postConfigure((container) => {
  container
    .bind<TestDependency>(TOKENS.TestDependency)
    .to(ConcreteTestDependency)
    .inRequestScope();
});
