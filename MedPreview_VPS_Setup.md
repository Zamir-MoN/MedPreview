# MedPreview VPS Setup Guide

This guide provides step-by-step instructions for deploying the MedPreview platform directly on a Linux-based Virtual Private Server (VPS) such as Ubuntu 20.04/22.04 or Debian, without using Nginx.

## 1. Initial Server Preparation

First, update your system packages and install necessary utilities:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl git build-essential ufw -y
```

## 2. Install Node.js & PM2

MedPreview requires Node.js for both the backend and building the frontend.
```bash
# Install Node.js (v18 or v20 recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally to manage background processes
sudo npm install -g pm2
```

## 3. Setup the Project Directory

Assuming you are deploying to `~/medpreview`:
```bash
mkdir -p ~/medpreview
cd ~/medpreview

# Clone your repository or copy your files into this directory
# git clone <your-repo-url> .
```

## 4. Backend Configuration & Build

```bash
cd ~/medpreview/backend

# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env
# Edit the .env file with your specific variables (e.g., AI_API_KEY)
nano .env

# Generate Prisma Client & Migrate Database (SQLite)
npx prisma generate
npx prisma migrate deploy

# Build the TypeScript backend
npx tsc
```

## 5. Frontend Build

```bash
cd ~/medpreview/frontend

# Install dependencies
npm install

# Build the production static files
npm run build
```

## 6. Start Services with PM2

Use the provided `ecosystem.config.js` to start both the backend and frontend services:
```bash
cd ~/medpreview

# Start the application using PM2 (Note: Port 80 might require you to run as root, e.g. `sudo pm2 start ecosystem.config.js` or configure authbind)
pm2 start ecosystem.config.js

# Save PM2 state to restart on server reboot
pm2 save
pm2 startup
# Run the command that pm2 startup outputs
```

## 7. Firewall Configuration (UFW)

Open the necessary ports for HTTP (Frontend) and Backend API:
```bash
sudo ufw allow 80/tcp    # Frontend
sudo ufw allow 8400/tcp  # Backend API
sudo ufw allow OpenSSH
sudo ufw enable
```

Your MedPreview instance should now be live and accessible directly via your server's IP address!
