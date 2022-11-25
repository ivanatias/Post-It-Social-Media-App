import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { postId, userId } = req.query;

  try {
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
  } catch (error) {
    res.status(500).end();
  }
};
