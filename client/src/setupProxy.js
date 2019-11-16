const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use("/auth/**", proxy({ target: "http://localhost:5000" }));
//   app.use("/api/**", proxy({ target: "http://localhost:5000" }));
//   app.use("/compose/**", proxy({ target: "http://localhost:5000" }));
// };

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/api/**", { target: "http://localhost:5000" }));
  app.use(proxy("/compose/**", { target: "http://localhost:5000" }));
};
