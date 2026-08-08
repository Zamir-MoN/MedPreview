# MedPreview Documentation

## Overview

**MedPreview** is a luxury, AI-powered full-stack medical portfolio platform. It is designed to provide medical professionals with a premium web presence, featuring an interactive appointment booking system, and AI-driven blog generation using the MedEngine API. The platform heavily emphasizes a polished user experience with glassmorphism design, advanced animations, and smooth scrolling capabilities.

## Architecture

The project is structured into two main components:

1. **Frontend**: 
   - **Framework:** React.js (built with Vite for fast bundling).
   - **Styling:** Tailwind CSS to achieve a luxury glassmorphism aesthetic.
   - **Animations:** GSAP and Framer Motion for dynamic, smooth micro-interactions.
   - **Scrolling:** Lenis for smooth scrolling effects.
   - **Deployment:** Compiled into static HTML/CSS/JS (`dist` directory) to be served efficiently via Nginx.

2. **Backend**:
   - **Framework:** Node.js with Express.
   - **Language:** TypeScript for type safety.
   - **Database:** SQLite managed via Prisma ORM. This allows for a lightweight, serverless database setup perfect for standard deployments.
   - **Features:** 
     - API endpoints for the appointment booking form.
     - Integration with the `MedEngine API` for automated, AI-generated blog posts.
     - Static file serving for user uploads.

3. **Process Management**:
   - **PM2:** Used to run and persist the Node.js backend cluster, keeping it alive across crashes or system reboots.

4. **Web Server / Reverse Proxy**:
   - **Nginx:** Acts as the entry point for all web traffic. It serves the React static files directly for maximum performance and proxies any `/api/` or `/uploads/` requests to the Node.js backend.

## How It Works

1. **User Interaction:** A user visits the frontend (e.g., `drjonathan.com`). Nginx serves the React application directly from the `frontend/dist` directory.
2. **API Requests:** When a user submits an appointment or requests an AI-generated blog, the frontend makes an HTTP request to `/api/...`.
3. **Reverse Proxy:** Nginx intercepts the `/api/` request and proxies it to the local backend running on port `8400`. The Nginx configuration explicitly increases timeouts to 300 seconds to accommodate potentially slow AI-generation tasks.
4. **Backend Processing:** 
   - For database operations (like saving appointments), the backend communicates with the SQLite database using Prisma.
   - For AI content generation, the backend reaches out to the MedEngine API, awaits the response, and returns the result to the frontend.
5. **Static Uploads:** Any files uploaded by users or generated dynamically are stored in the `/uploads/` directory on the backend and are served back through the `/uploads/` route, which is also proxied by Nginx.

## Network Ports Used

Below is a detailed breakdown of the network ports utilized by this project:

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| **80** | TCP | HTTP (Nginx) | Default web traffic port. Usually redirects to HTTPS. Nginx listens here for incoming connections from the internet. |
| **443** | TCP | HTTPS (Nginx) | Secure web traffic port. Configured via Certbot/Let's Encrypt for encrypted communication between the user's browser and the server. |
| **8400** | TCP | Node.js Backend | The internal port where the Express backend API runs. It is not exposed to the public internet directly; Nginx acts as a proxy for it. |
| **4100** | TCP | Frontend Preview | (Optional) Port used by the Vite frontend preview server when started via PM2 (`ecosystem.config.js`). In a standard Nginx static deployment, this port is typically not required for production routing, but is available for testing. |

### Firewall Rules Note
For a standard deployment, only ports **80** and **443** (along with standard SSH, port 22) need to be open to the public on the server's firewall. Ports **8400** and **4100** should remain strictly internal.
