type CandidatePart = { text?: string }
type CandidateContent = { parts?: CandidatePart[] }
type Candidate = { content?: CandidateContent }
type ResponseAI = { candidates?: Candidate[] }

const textExtractor = (responseAI: ResponseAI): string => {
    try {
        const message = responseAI.candidates
        if (!message || message.length === 0) {
            throw new Error('Invalid API response structure')
        }

        const firstCandidate = message[0]
        if (
            !firstCandidate ||
            !firstCandidate.content ||
            !firstCandidate.content.parts ||
            firstCandidate.content.parts.length === 0
        ) {
            throw new Error('Invalid candidate structure')
        }

        const firstPart = firstCandidate.content.parts[0]
        if (!firstPart || !firstPart.text) {
            throw new Error('Text part is missing')
        }

        return firstPart.text
    } catch (error) {
        console.error('Error extracting text:', error)
        return 'Error extracting text from API response.'
    }
}

export default textExtractor
