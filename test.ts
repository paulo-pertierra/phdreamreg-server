import QRCode from "qrcode";

QRCode.toFile("file.png", "Hello");

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  secure: true,
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

cloudinary.uploader
  .upload("file.png", {
    public_id: "folder/file",
    overwrite: true
  });

import * as fs from "fs";

fs.unlink(__dirname + "\\file.png", (error) => {
  if (error) console.error(error);
});