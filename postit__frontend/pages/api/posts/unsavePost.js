import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { postId, userId } = req.query;

  try {
    await client
      .patch(postId)
      .unset([`saved[_key=="${userId}"]`])
      .commit();
    res.status(200).json({
      message: `Post succesfully unsaved by user ${userId}`,
    });
  } catch (error) {
    res.status(500).end();
  }
};
