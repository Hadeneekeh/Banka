const statusCheck = (req, res, next) => {
  if (req.query.status === 'active' || req.query.status === 'dormant' || req.query.status === undefined) {
    return next();
  }
  return res.status(404).json({
    status: res.statusCode,
    error: 'Invalid account status',
  });
};

export default statusCheck;
