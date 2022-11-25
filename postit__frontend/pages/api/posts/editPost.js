import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { postId, postTitle, postDescription, postCategory } = req.body;

  try {
    await client
      .patch(postId)
      .set({
        title: postTitle,
        description: postDescription,
        category: postCategory,
      })
      .commit();
    res.status(200).json({ message: "Post edited." });
  } catch (error) {
    res.status(500).json(error);
  }
};
