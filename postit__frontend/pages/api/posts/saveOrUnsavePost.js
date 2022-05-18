import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { postId, userId, action } = req.query;
      if (action === "save") {
        await client
          .patch(postId)
          .setIfMissing({ saved: [] })
          .insert("after", "saved[-1]", [
            {
              _key: userId,
              userId: userId,
              postedBy: {
                _type: "postedBy",
                _ref: userId,
              },
            },
          ])
          .commit();
        res.status(200).json({
          message: `Post succesfully saved by user ${userId}`,
        });
      }
      if (action === "unsave") {
        await client
          .patch(postId)
          .unset([`saved[_key=="${userId}"]`])
          .commit();
        res.status(200).json({
          message: `Post succesfully unsaved by user ${userId}`,
        });
      }
    } catch (error) {
      res.status(500).end();
    }
  }
  res.status(405).end();
};
