import { createUploadthing, type FileRouter } from "uploadthing/next";

import sharp from 'sharp'
import {z} from 'zod'
import connectToDatabase from "@/db";
import ImageModel from "@/lib/model";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  
  imageUploader: f({ image: { maxFileSize: "4MB" } })
   .input(z.object({configId: z.string().optional()}))
    .middleware(async ({ input }) => {
        return {input}
    })
    .onUploadComplete(async ({ metadata, file }) => {
         const {configId}=metadata.input
         const res=await fetch(file.url);
         const buffer=await res.arrayBuffer()
         const imgMetadata=await sharp(buffer).metadata()
         const {width, height}=imgMetadata
         await connectToDatabase();

         let newImage;
         if (!configId) {
           newImage = new ImageModel({
             imageUrl: file.url,
             height: height || 500,
             width: width || 500,
           });
           await newImage.save();
   
           return { configId: newImage._id.toString() };
         }else  {
            const updateImage=await ImageModel.findByIdAndUpdate(
                    configId,
                    {croppedImageUrl:file.url},
                    {new:true}
            );
            return {configId: updateImage?._id.toString()};
         }
       

    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;