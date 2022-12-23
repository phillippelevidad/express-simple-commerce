import "express-async-errors";
import "services/common/register";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { NotFoundError } from "lib/errors/NotFoundError";
import { currentTenant } from "middlewares/currentTenant";
import { currentUser } from "middlewares/currentUser";
import { disposeScopedContainer } from "middlewares/disposeScopedContainer";
import { errorHandler } from "middlewares/errorHandler";
import { requestContext } from "middlewares/requestContext";
import { router as categoriesRouter } from "services/categories/router";

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
