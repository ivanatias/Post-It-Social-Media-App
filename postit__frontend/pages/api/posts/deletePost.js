import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { postId } = req.body;
  try {
    await client.delete(postId);
    res.status(200).json({
      message: "Post succesfully deleted",
    });
  } catch (error) {
    res.status(500).end();
  }
};
