const crypto = require("crypto");

const cspNonce = crypto.randomBytes(16).toString("base64");

const setSecurityHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, authorization, Content-Type, Accept, withcredentials"
  );
  //res.setHeader("Access-Control-Allow-Credentials", true);

  // Content-Security-Policy Configuration
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'nonce-${cspNonce}'; style-src 'self' https: 'unsafe-inline';`
  );

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // Cross-Origin-Embedder-Policy Configuration
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // This header enforces cross-origin isolation.

  // Cross-Origin-Opener-Policy Configuration
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // This header controls how a page is isolated from other origins.

  // Cross-Origin-Resource-Policy Configuration
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin"); // This header blocks other origins from loading your resources in some cases.

  // Origin-Agent-Cluster Configuration
  res.setHeader("Origin-Agent-Cluster", "?1"); // This header provides a mechanism for web applications to isolate their origins from other processes.

  // Other Security Headers Configuration
  res.setHeader("X-Content-Type-Options", "nosniff"); // This header mitigates MIME type sniffing, reducing security risks.
  res.setHeader("X-Frame-Options", "SAMEORIGIN"); // This header mitigates clickjacking attacks.
  res.setHeader("X-Download-Options", "noopen"); // This header forces downloads to be saved (Internet Explorer only).
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none"); // This header controls cross-domain behavior for Adobe products, like Acrobat.
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin"); // This header controls the Referer header.

  // Strict-Transport-Security (HSTS) Configuration
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains"
  ); // This header instructs browsers to prefer HTTPS instead of insecure HTTP.
};

module.exports = setSecurityHeaders;
