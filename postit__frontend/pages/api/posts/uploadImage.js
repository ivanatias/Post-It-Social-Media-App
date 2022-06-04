import { client } from "../../../client/client";
import formidable from "formidable";
import { createReadStream } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();

  form.keepExtensions = true;

  const formPromise = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      const file = files.uploadedFile;
      const document = await client.assets.upload(
        "image",
        createReadStream(file.filepath),
        {
          contentType: file.mimetype,
          filename: file.originalFilename,
        }
      );
      resolve(document);
    });
  });

  res.json(formPromise);
};
