import { client } from "../../../client/client";

module.exports = async (req, res) => {
  try {
    const { name, googleId, imageUrl } = req.query;

    const doc = {
      _type: "user",
      _id: googleId,
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("User logged in / created");
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};