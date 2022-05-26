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
  {
    name: "Other",
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
    title,
    postedBy -> {
      _id,
      userName,
      image,
      userTag,
    },
    saved[] {
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

export const postQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}'] {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    description,
    category,
    postedBy -> {
      _id,
      userName,
      image,
      userTag,
    },
    saved[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image,
        userTag
      }
     }, 
    comments[] {
      comment,
      _key,
      postedBy -> {
        _id,
        userName,
        image,
        userTag,
      }
    },
  }`;

  return query;
};

export const postsByCategoryQuery = (category, postId) => {
  const query = `*[_type == "post" && category == '${category}' && _id != '${postId}' ] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    postedBy -> {
      _id,
      userName,
      image,
      userTag,
    },
    saved[] {
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
