import { client } from "../../../client/client";

import { userQuery } from "../../../utils/data";

module.exports = async (req, res) => {
  try {
    const { googleId } = req.query;
    const query = userQuery(googleId);

    const data = await client.fetch(query);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};
