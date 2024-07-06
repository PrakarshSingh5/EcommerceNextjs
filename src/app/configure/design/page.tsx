import ImageModel from "@/lib/model"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"
import connectToDatabase from "@/db"


interface PageProps{
    searchParams:{
        [key:string]:string | string[] | undefined
    }
}
const Page=async({searchParams}:PageProps)=>{
    const {id}=searchParams;

    if(!id || typeof id !== "string"){
        return notFound()
    }
    await connectToDatabase();
    const configuration=await ImageModel.findById(id)
    if(!configuration){
        return notFound()
    }
    const {imageUrl, width , height}=configuration

    

    return <DesignConfigurator configId={configuration._id.toString()} imageDeimensions={{width,height}} imageUrl={imageUrl} />

}
export default Page;