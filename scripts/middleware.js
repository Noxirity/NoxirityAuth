export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ status: "error", error: "Internal Server Error" });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ status: "error", error: "Not Found" });
}
