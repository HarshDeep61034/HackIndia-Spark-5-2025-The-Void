# Athena - Document-based Learning Assistant

Athena is an intelligent learning assistant that allows administrators to upload course materials and enables students to interact with an AI that has knowledge of those materials.

## Features

- Document upload support for PDF, DOCX, TXT, and MD files
- Automatic document processing and vectorization
- Course-specific document management
- Real-time chat interface with context-aware responses
- Modern, responsive UI

## Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Pinecone account for vector database
- OpenAI API key for embeddings and chat

### Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index_name
PORT=3000
NODE_ENV=development
```

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Documents

- `POST /api/documents/upload` - Upload a document
- `GET /api/documents/list` - List all documents
- `GET /api/documents/status/:documentId` - Get document processing status
- `DELETE /api/documents/delete` - Delete a document

### Chat

- `POST /api/chat` - Send a message and get AI response

## Architecture

- Frontend: React with Material-UI
- Backend: Express.js
- Vector Database: Pinecone
- Document Processing: LangChain
- Embeddings: OpenAI

## Security Considerations

- API keys are stored securely in environment variables
- File uploads are validated and sanitized
- Error messages are sanitized in production
- Document access is scoped by course

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
