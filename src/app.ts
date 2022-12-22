import "express-async-errors";
import "services/common/register";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { errorHandler } from "middlewares/errorHandler";
import { router as categoriesRouter } from "services/categories/router";
import { currentTenant } from "middlewares/currentTenant";
import { currentUser } from "middlewares/currentUser";
import { requestContext } from "middlewares/requestContext";
import { NotFoundError } from "lib/errors/NotFoundError";
import { disposeScopedContainer } from "middlewares/disposeScopedContainer";

export const app = express();

app.use(cors());
app.use(json());
app.use(requestContext());
app.use(currentTenant());
app.use(currentUser());

app.use("/api/categories", categoriesRouter);

app.get("*", () => {
  throw new NotFoundError();
});

app.use(disposeScopedContainer());
app.use(errorHandler());
