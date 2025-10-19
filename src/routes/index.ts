import express from 'express'
import generateContent from '../controller/generateContentController.ts'
import multer from 'multer'
const upload = multer()

const router = express.Router()

router.post('/generate-text', generateContent.generateText)

router.post(
    '/generate-image',
    upload.single('file'),
    generateContent.generateImage
)

router.post(
    '/generate-document',
    upload.single('file'),
    generateContent.generateDocument
)

router.post(
    '/generate-audio',
    upload.single('file'),
    generateContent.generateAudio
)

router.post(
    '/generate-from-file',
    upload.single('file'),
    generateContent.generateTextFromFile
)

router.post(
    '/chat',
    generateContent.chat
)

export default router
