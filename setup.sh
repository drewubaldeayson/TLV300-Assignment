#!/bin/bash

# Color variables
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"
    
    # Check Node.js
    if ! command_exists node; then
        echo -e "${RED}Node.js is not installed${NC}"
        echo "Please install Node.js (https://nodejs.org/)"
        exit 1
    fi

    # Check npm
    if ! command_exists npm; then
        echo -e "${RED}npm is not installed${NC}"
        echo "Please install npm (comes with Node.js)"
        exit 1
    fi

    echo -e "${GREEN}✓ Prerequisites checked successfully${NC}"
}

# Function to create .env file
create_env_file() {
    local env_path="$1"
    
    # Check if .env already exists
    if [ -f "$env_path" ]; then
        echo -e "${YELLOW}existing .env file found${NC}"
        return
    fi

    # Prompt for API key
    read -p "Enter WhoisXML API Key: " api_key

    # Validate API key
    if [ -z "$api_key" ]; then
        echo -e "${RED}API Key cannot be empty${NC}"
        exit 1
    fi

    # Create .env file
    cat > "$env_path" << EOL
WHOIS_API_KEY=${api_key}
PORT=5000
NODE_ENV=development
EOL

    echo -e "${GREEN}✓ .env file created successfully${NC}"
}

# Function to install dependencies
install_dependencies() {
    local dir="$1"
    local name="$2"

    echo -e "${YELLOW}Installing dependencies for ${name}...${NC}"
    
    # Change to directory
    cd "$dir" || exit

    # Install dependencies
    if npm install; then
        echo -e "${GREEN}✓ ${name} dependencies installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install ${name} dependencies${NC}"
        exit 1
    fi

    # Return to original directory
    cd - > /dev/null
}

# Function to start backend and frontend
start_project() {
    echo -e "${YELLOW}Starting WHOIS Lookup Project...${NC}"

    # Start backend
    cd backend
    (npm start > backend.log 2>&1) &
    backend_pid=$!
    cd ..

    # Wait a moment to ensure backend is up
    sleep 3

    # Start frontend
    cd frontend
    (npm start > frontend.log 2>&1) &
    frontend_pid=$!
    cd ..

    echo -e "${GREEN}✓ Backend and Frontend started${NC}"
    echo -e "${YELLOW}Logs are being written to backend/backend.log and frontend/frontend.log${NC}"

    # Trap to kill background processes on script exit
    trap "kill $backend_pid $frontend_pid" EXIT
}

# Main setup function
main() {
    clear
    echo -e "${GREEN}WHOIS Lookup Project Setup${NC}"
    echo "----------------------------"

    # Check prerequisites
    check_prerequisites

    # Create .env file for backend if not exists
    create_env_file "backend/.env"

    # Install backend dependencies
    install_dependencies "backend" "Backend"

    # Install frontend dependencies
    install_dependencies "frontend" "Frontend"

    # Start the project
    start_project

    # Keep script running
    wait
}

# Run main function
main