## Hacktiv8 Session 4 Submission

### Tech Stack
- Node.js
- Express.js
- TypeScript

### Libraries
- express
- multer (file upload middleware)
- dotenv (environment variable loader)
- @google/genai (Google Gemini AI integration)

### How to Run
1. Install dependencies:
	 ```sh
	 npm install
	 ```
2. Create a `.env` file in the root directory and set your environment variables (e.g. `GOOGLE_GEMINI_API_KEY`).
3. Start the development server:
	 ```sh
	 npm run dev
	 ```
	 The server will run at `http://localhost:3000` by default.

### API Contract

Base URL: `/api`

#### POST `/generate-text`
- **Body:** `{ "prompt": "your text prompt" }`
- **Response:** `{ "message": "AI generated text" }`

#### POST `/generate-image`
- **Form Data:**
	- `file`: image file (single upload)
	- `prompt`: text prompt
- **Response:** `{ "message": "AI generated image result" }`

#### POST `/generate-document`
- **Form Data:**
	- `files`: document files (multiple upload)
	- `prompt`: text prompt
- **Response:** `{ "message": "AI generated document result" }`

#### POST `/generate-audio`
- **Form Data:**
	- `audioFile`: audio file (single upload)
	- `prompt`: text prompt
- **Response:** `{ "message": "AI generated audio result" }`