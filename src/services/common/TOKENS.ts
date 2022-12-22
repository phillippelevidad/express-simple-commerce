import { token } from "lib/di/token";
import { TestDependency } from "./dependencies/TestDependency";

export const TOKENS = {
  TestDependency: token<TestDependency>("TestDependency"),
};
