// Prevent brute force attacks
const rateLimitWindowMs = 1 * 60 * 1000; // 1 minute
const maxRequestsPerWindow = 25; // Max 15 requests per windowMs
const banWindowMs = 15 * 60 * 1000; // 15 minutes
const requestCounts = {}; // Store the request counts per IP
const bannedIPs = new Set(); // Set to store banned IPs

module.exports = (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const currentTime = Date.now();

  // Check if IP is banned
  if (bannedIPs.has(ip)) {
    res.writeHead(429, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "IP banned. Please try again later.",
        statusCode: 429,
      })
    );
    return;
  }

  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 1,
      startTime: currentTime,
    };
  } else {
    requestCounts[ip].count++;

    // Check if IP has exceeded the maximum requests per window
    if (currentTime - requestCounts[ip].startTime > rateLimitWindowMs) {
      requestCounts[ip] = {
        count: 1,
        startTime: currentTime,
      };
    } else if (requestCounts[ip].count > maxRequestsPerWindow) {
      // Ban the IP for the specified banWindowMs
      bannedIPs.add(ip);
      setTimeout(() => {
        bannedIPs.delete(ip);
      }, banWindowMs);

      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "IP banned. Please try again later.",
          statusCode: 429,
        })
      );
      return;
    }
  }

  next();
};
