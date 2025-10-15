import '../src/config/dotenv.ts'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.ts'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    }
)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
