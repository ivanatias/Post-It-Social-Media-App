import { client } from "../../../client/client";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { user } = req.body;
  try {
    const response = await client.fetch(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
