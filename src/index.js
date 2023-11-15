const http = require("http");
const dotenv = require("dotenv");
const setSecurityHeaders = require("./helper/headers.helper");

dotenv.config();

const port = process.env.PORT || 3000;

const routes = require("./routes/index.routes");
const router = require("./routes/router");

const server = http.createServer(async (req, res) => {
  setSecurityHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  await router(req, res, routes);
});

server.listen(port, () => {
  console.log(`> Server is running on port ${port}`);
});
