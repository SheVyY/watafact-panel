#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting setup for your project...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js and try again.${NC}"
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}Yarn is not installed. Installing Yarn...${NC}"
    npm install -g yarn
else
    echo -e "${GREEN}Updating Yarn to the latest version...${NC}"
    npm install -g yarn@latest
fi

# Clear Yarn cache
echo -e "${GREEN}Clearing Yarn cache...${NC}"
yarn cache clean

# Remove existing node_modules and yarn.lock
echo -e "${GREEN}Removing existing node_modules and yarn.lock...${NC}"
rm -rf node_modules yarn.lock

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
yarn install

# Create a .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "${GREEN}Creating .env.local file...${NC}"
    cat << EOF > .env.local
# OpenAI API Key for AI functionality
OPENAI_API_KEY=your_openai_api_key_here

# Supabase configuration for authentication and database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Database configuration
DB_PASSWORD=your_database_password_here
DB_USER=your_database_user_here
DB_NAME=your_database_name_here
DB_URL=your_database_url_here
EOF
    echo -e "${YELLOW}A .env.local file has been created with placeholder values.${NC}"
else
    echo -e "${YELLOW}A .env.local file already exists. Please review it to ensure all variables are set correctly.${NC}"
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo -e "1. Open the .env.local file in your project root."
echo -e "2. Replace the placeholder values with your actual API keys and configuration details."
echo -e "3. Save the .env.local file after making your changes."
echo -e "4. Run ${YELLOW}yarn dev${NC} to start the development server."
echo -e "\n${YELLOW}Important:${NC} Keep your .env.local file secure and never commit it to version control."
echo -e "If you need to share environment variables with your team, consider using .env.example as a template."
