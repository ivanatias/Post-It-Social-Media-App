import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { postId, userId, commentKey } = req.body;

  try {
    await client
      .patch(postId)
      .unset([`comments[_key=="${commentKey}"]`])
      .commit();

    res.status(200).json({
      message: `Comment removed by user ${userId} on post ${postId}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
