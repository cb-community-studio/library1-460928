const users = require("./users/users.service.js");
const books = require("./books/books.service.js");
const borrow-history = require("./borrow-history/borrow-history.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(books);
  app.configure(borrow-history);
  // ~cb-add-configure-service-name~
};
