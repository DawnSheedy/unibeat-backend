import { Express } from "express";
const express = require("express");
const web: Express = express();
const port = process.env.PORT ?? 8080;

web.get("/", (req, res) => {
  res.send("Hello World!");
});

//web.use("/api", api);

web.listen(port, () => {
  console.log(`🎧️ unibeat-backend listening on port ${port}`);
});

export { web };
