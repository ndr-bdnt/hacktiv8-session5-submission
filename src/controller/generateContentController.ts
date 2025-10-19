import { GoogleGenAI } from '@google/genai'
import textExtractor from '../helper/textExtractor.ts'
import type { Request, Response } from 'express'

const AI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
})

const MODEL = 'gemini-2.5-flash'

function handleError(res: Response, error: unknown, type: string) {
    res.status(500).json({ message: `Error generating ${type}`, error })
}

async function generateWithFileAndPrompt(
    req: Request,
    res: Response,
    type: string
) {
    try {
        const { prompt } = req.body
        const fileBuffer = req.file?.buffer
        if (!fileBuffer) {
            return res.status(400).json({ message: 'No file uploaded' })
        }
        const base64 = fileBuffer.toString('base64')
        const mimeType: string = req.file?.mimetype ?? ''
        const responseAI = await AI.models.generateContent({
            model: MODEL,
            contents: [
                {
                    inlineData: {
                        mimeType,
                        data: base64,
                    },
                },
                {
                    text: prompt,
                },
            ],
        })
        res.json({ message: textExtractor(responseAI) })
    } catch (error) {
        handleError(res, error, type)
    }
}

const generateContent = {
    generateText: async (req: Request, res: Response) => {
        try {
            const { prompt } = req.body
            const responseAI = await AI.models.generateContent({
                model: MODEL,
                contents: prompt,
            })
            res.json({ message: textExtractor(responseAI) })
        } catch (error) {
            handleError(res, error, 'text')
        }
    },
    chat: async (req: Request, res: Response) => {  
        try {
            const {role, prompt } = req.body
             const responseAI = await AI.models.generateContent({
                model: MODEL,
                contents: prompt,
            })
            res.json({
                role: 'BOT',
                message: textExtractor(responseAI) })
        } catch (error) {
            handleError(res, error, 'chat')
        }
    },
    generateImage: (req: Request, res: Response) =>
        generateWithFileAndPrompt(req, res, 'image'),
    generateAudio: (req: Request, res: Response) =>
        generateWithFileAndPrompt(req, res, 'audio'),
    generateDocument: (req: Request, res: Response) =>
        generateWithFileAndPrompt(req, res, 'document'),
    generateTextFromFile: (req: Request, res: Response) =>
        generateWithFileAndPrompt(req, res, 'text from file'),
}

export default generateContent
