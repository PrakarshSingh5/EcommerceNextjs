"use server"

import { CaseColor, CaseFinish, CaseMaterial, ImageModel, PhoneModel } from "@/lib/model";
import connectToDatabase from "@/db";
import { config } from "process";

export type SaveConfigArgs={
    color:CaseColor
    finish:CaseFinish
    material:CaseMaterial
    model:PhoneModel
    configId:string
}
export async function saveConfig({color, finish,material,model, configId}:SaveConfigArgs){
    await connectToDatabase();   
    try{
            await ImageModel.findByIdAndUpdate(
                configId,
                {color, finish, material, model},
                {new:true}
            );
        }catch(err){
            console.log("Error in uploading data",err);
        }

}