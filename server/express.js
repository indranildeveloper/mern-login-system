// Imports
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// Modules for server side rendering

// React Modules
import React from "react";
import ReactDOMServer from "react-dom/server";
// Router Modules
import { StaticRouter } from "react-router-dom";
import MainRouter from "./../client/MainRouter";
// Material-UI modules
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";
// end

// Client Side
// Comment in production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Comment in production
devBundle.compile(app);

// Parse body params and attache them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// Secure apps by setting various HTTP handlers
app.use(helmet());
// Enable CORS = Cross Origin Resource Sharing
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Mount Routes
app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

// Catch unauthorized error
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
