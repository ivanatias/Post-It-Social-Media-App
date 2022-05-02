import { client } from "../../client/client";

import { categoriesQuery } from "../../utils/data";

module.exports = async (req, res) => {
  try {
    const query = categoriesQuery();
    const categories = await client.fetch(query);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(categories));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};
