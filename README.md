# WHOIS Lookup Application

## Overview
This is a full-stack WHOIS lookup application that allows users to retrieve domain and contact information using the WhoisXML API.

## Features
- Lookup domain information
- Retrieve contact details
- User-friendly interface
- Error handling
- Responsive design
- High-quality and clean code

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- WhoisXML API Key

## Technology Stack
- Backend: Node.js, Express
- Frontend: React.js
- API: WhoisXML API


## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/drewubaldeayson/TLV300-Assignment.git
cd TLV300-Assignment
```

### 2. Backend Setup
```bash
# Navigate to backend directory from the root directory of this project
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

### 3. Configure Environment Variables
Open the .env file and add:
```bash
WHOIS_API_KEY=your_whois_api_key_here
PORT=5000
NODE_ENV=development
```

### 4. Frontend Setup
Open the .env file and add:
```bash
# Navigate to frontend directory from the root directory of this project
cd frontend

# Install dependencies
npm install
```

### 5. Running the Application
Start Backend Server:
```bash
# Navigate to backend directory from root directory
cd backend

# Start the app
npm start
# Server will run on http://localhost:5000
```

Start Backend Server:
```bash
# Navigate to backend directory from root directory
cd frontend

# Start the app
npm start
# Server will run on http://localhost:3000 by default
```
