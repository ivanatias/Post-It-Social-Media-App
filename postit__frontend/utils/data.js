export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const categoriesQuery = () => {
  const query = `*[_type == "category"]`;
  return query;
};
