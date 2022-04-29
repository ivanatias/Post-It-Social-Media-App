import { client } from "../../../client/client";

module.exports = async (req, res) => {
  const { name, googleId, imageUrl } = req.query;

  const doc = {
    _type: "user",
    _id: googleId,
    userName: name,
    image: imageUrl,
  };

  client.createIfNotExists(doc);

  return res.status(200).json(doc);
};
