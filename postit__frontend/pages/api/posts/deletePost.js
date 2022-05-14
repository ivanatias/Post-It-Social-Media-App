import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { postId } = req.body;
      client.delete(postId);
      res.status(200).json({
        message: "Post succesfully deleted",
      });
    } catch (error) {
      res.status(500).end();
    }
  }

  res.status(405).end();
};
