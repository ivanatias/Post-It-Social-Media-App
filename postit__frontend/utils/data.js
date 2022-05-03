export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const categories = [
  {
    name: "Technology",
  },
  {
    name: "Animals",
  },
  {
    name: "Cars",
  },
  {
    name: "Food",
  },
  {
    name: "Travel",
  },
  {
    name: "Sports",
  },
  {
    name: "Nature",
  },
  {
    name: "Art",
  },
];
