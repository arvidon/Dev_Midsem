import {type Request, type Response} from 'express';
import { prisma } from "../../db";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from '../../lib/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export const getBlog = async(req: Request, res: Response) => {
    try{
        const userId = req.body
        const blogs = await prisma.blog.findMany({where: {userId}})
        return res.status(200).json({blogs})
    }catch(error: any){
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const getSpecificBlog = async(req: Request, res: Response) => {
    try{
        const blogId = req.params.blogId as string
        const blog = await prisma.blog.findUnique({
            where: {blogId}
        })
        return res.status(200).json({blog})
    }catch(error: any){
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const postBlog = async(req: Request, res: Response) => {
    
}

const presignedUpload = async(req: Request, res: Response) => {
    try{
        const {fileName, fileType} = req.body
        const userId = req.userId
        if(!fileName || !fileType){return res.status(400).json({message: "filename and filetype are required"})}
        const result = await generatePreSignedUrl(fileName, fileType, userId)
        res.status(200).json({result})
    }catch(error: any){
        res.status(400).json({message: error.message})
    }
}

const getFileExtension = (fileName: string) => {
    const parts = fileName.split('.')
    const extension = parts[parts.length - 1]
    return extension && extension !== fileName ? extension : 'bin'
}

const generatePreSignedUrl = async(fileName: string, fileType: string, userId: string) => {
    const extension = getFileExtension(fileName)
    const key = `uploads/${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        ContentType: fileType
    })

    const signedUrl = await getSignedUrl(r2, command, {expiresIn: 300})

    const publicUrl = process.env.R2_PUBLIC_URL ? `${process.env.R2_PUBLIC_URL.replace(/\/$/,'')}/${key}` : null
    return {signedUrl, key, publicUrl}
}