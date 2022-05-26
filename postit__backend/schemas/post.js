export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
    },
    {
      name: "description",
      title: "Post Description",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },

    {
      name: "postedBy",
      title: "Posted By",
      type: "postedBy",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "saved",
      title: "Saved",
      type: "array",
      of: [{ type: "saved" }],
    },
    {
      name: "comments",
      type: "Comments",
      type: "array",
      of: [{ type: "comment" }],
    },
  ],
};
