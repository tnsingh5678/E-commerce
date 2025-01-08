import { Readable } from 'stream';
import cloudinary from 'cloudinary';


const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null); // Indicate end of stream
        
        const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url); // return the secure URL from Cloudinary
            }
        );
        
        bufferStream.pipe(cloudinaryUploadStream); // Pipe the buffer stream to Cloudinary
    });
};

export default uploadToCloudinary;
