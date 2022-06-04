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
      }
    },
  }`;

  return query;
};

export const usersQuery = () => {
  const query = `*[_type == "user"]`;
  return query;
};

export const postsByUserQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    category,
    postedBy->{
      _id,
      userName,
      image,
      userTag,
    },
    saved[]{
      postedBy->{
        _id,
      },
    },
  }`;
  return query;
};

export const postsSavedByUserQuery = (userId) => {
  const query = `*[ _type == 'post' && '${userId}' in saved[].userId ] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image,
      userTag,
    },
    saved[]{
      postedBy->{
        _id,
      },
    },
  }`;

  return query;
};

export const searchPostQuery = (searchTerm) => {
  if (!searchTerm) return;
  const query = `*[_type == "post" && title match '${searchTerm}' || description match '${searchTerm}']{
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
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
      }
    },
  }`;
  return query;
};
