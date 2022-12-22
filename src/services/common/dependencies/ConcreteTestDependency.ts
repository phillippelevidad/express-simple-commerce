import { injectable } from "inversify";
import { TestDependency } from "./TestDependency";

@injectable()
export class ConcreteTestDependency implements TestDependency {
  sayHello() {
    return "Hello World!";
  }
}
