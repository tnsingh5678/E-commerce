import { v2 } from "cloudinary"
import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})



export default async function uploadToCloudinary(fileBuffer) {
  try {
    // Return a promise that resolves once the file is uploaded
    const result = await new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        { resource_type: "auto" }, // auto-detect file type (image, video, etc.)
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Cloudinary result:", result);
            resolve(result);
          }
        }
      );

      // Upload the file buffer
      stream.end(fileBuffer);
    });
    console.log(result)
    return result.secure_url; // The uploaded file result
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error; // Rethrow the error after logging it
  }
}
