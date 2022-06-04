import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { user } = req.body;
      const response = await client.fetch(user);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  res.status(405).end();
};
