import { cloudinary } from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadBuffer = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder }, (error, uploaded) => {
      if (error) return reject(error);
      resolve(uploaded);
    });

    readable.pipe(stream);
  });
};
