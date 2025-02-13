export const getPaginationOptions = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const order = req.query.sort
    ? [[req.query.sort, req.query.order || "ASC"]]
    : [];

  return { limit, offset, order };
};
