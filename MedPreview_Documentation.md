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
   - **Deployment:** Compiled into static HTML/CSS/JS (`dist` directory) to be served directly via PM2.

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



## How It Works

1. **User Interaction:** A user visits the frontend via the direct PM2 preview port.
2. **API Requests:** When a user submits an appointment or requests an AI-generated blog, the frontend makes an HTTP request directly to the backend API port.
4. **Backend Processing:** 
   - For database operations (like saving appointments), the backend communicates with the SQLite database using Prisma.
   - For AI content generation, the backend reaches out to the MedEngine API, awaits the response, and returns the result to the frontend.
4. **Static Uploads:** Any files uploaded by users or generated dynamically are stored in the `/uploads/` directory on the backend and are served back directly.

## Network Ports Used

Below is a detailed breakdown of the network ports utilized by this project:

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| **4821** | TCP | PM2 Frontend | The custom port running the React frontend application via PM2 preview. |
| **7291** | TCP | Node.js Backend | The internal port where the Express backend API runs. Handles all database and AI requests. |

### Firewall Rules Note
For a standard PM2-only deployment, ports **4821** and **7291** (along with standard SSH, port 22) need to be open to the public on the server's firewall.
