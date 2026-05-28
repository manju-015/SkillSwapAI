const admin = (req, res, next) => {
  console.log(req.user);

  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Admin access only",
    });
  }
};

export default admin;
