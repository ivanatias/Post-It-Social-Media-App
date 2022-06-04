import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { postImage, postTitle, postDescription, postCategory, userId } =
        req.body;
      const doc = {
        _type: "post",
        title: postTitle,
        description: postDescription,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: postImage._id,
          },
        },
        userId: userId,
        postedBy: {
          _type: "postedBy",
          _ref: userId,
        },
        category: postCategory,
      };
      await client.create(doc);
      res.status(200).json({ message: "Post succesfully created!" });
    } catch (error) {
      res.status(500).end();
    }
  }

  res.status(405).end();
};
