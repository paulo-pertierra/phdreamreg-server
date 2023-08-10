import {v2} from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

v2.config({ 
  secure: true,
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinary = v2;

export const uploadImage = async (file: string) => {
  let url = "";
  await cloudinary.uploader
    .upload(file, {
      use_filename: true,
      overwrite: true,
      unique_filename: true
    }).then((response) => {
      url = response.secure_url;
      console.log("uploaded!")
    }).catch((error) => {
      console.error(error);
    })
  return url;
}