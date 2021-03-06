import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@skgittix/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { getTicketsRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
