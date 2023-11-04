const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 3000;

const routes = require("./routes/routes");
const router = require("./routes/router");

const server = http.createServer(async (req, res) => {
    await router(req, res, routes);
});

server.listen(port, () => {
    console.log(`> Server is running on port ${port}`);
});
