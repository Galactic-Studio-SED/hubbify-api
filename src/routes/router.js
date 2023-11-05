const { parse } = require("querystring");

module.exports = (req, res, routes) => {
  const { method, url } = req;

  let routeMatch = null;

  // Find a route that matches the URL method and pattern
  routes.forEach((route) => {
    const routePattern = new RegExp(
      `^${route.url.replace(/:[^\s/]+/g, "([^/]+)")}$`
    );
    const matches = url.match(routePattern);

    if (method === route.method && matches) {
      routeMatch = route;

      const parameterNames = (route.url.match(/:[^\s/]+/g) || []).map((param) =>
        param.substring(1)
      );
      routeMatch.params = Object.fromEntries(
        parameterNames.map((name, index) => [name, matches[index + 1]])
      );
    }
  });

  if (routeMatch) {
    let body = [];

    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        if (body.length > 0) {
          body = Buffer.concat(body).toString();
        } else {
          body = null;
        }

        if (method === "POST" || method === "PUT") {
          req.body = parse(body);
        }

        req.params = routeMatch.params;

        // Run middleware before controller function
        if (routeMatch.middleware) {
          for (const middleware of routeMatch.middleware) {
            middleware(req, res, () => {
              // Continue with controller function
              routeMatch.handler(req, res);
            });
          }
        } else {
          // If there is no middleware, just call the handler function
          routeMatch.handler(req, res);
        }
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};
