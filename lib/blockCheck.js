module.exports = function (request, response, next) {
    if (!request.user) {
      request.flash("error", "You should login to see this page");
      response.redirect("/user/login");
    } else {
      next();
    }
};
  