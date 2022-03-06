const mustBeLogged = async (req, res, next) => {
  if (req.isAuthenticated()) next();
  else {
    res.status(401);
    res.redirect("/login");
  }
};

const mustNotBeLogged = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(403);
    res.redirect("/");
  } else next();
};

module.exports = { mustBeLogged, mustNotBeLogged };
