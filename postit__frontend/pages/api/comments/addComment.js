import { client } from "../../../client/client";
import { v4 as uuidv4 } from "uuid";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { postId, userId, comment } = req.body;
      await client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
            comment: comment,
          },
        ])
        .commit();

      res
        .status(200)
        .json({ message: `Comment added by user ${userId} on post ${postId}` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  res.status(405).end();
};
