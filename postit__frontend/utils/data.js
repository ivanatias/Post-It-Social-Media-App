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

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const postsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
  }`;

  return query;
};
