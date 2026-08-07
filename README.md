# Premium Doctor Portfolio Website

A luxury, AI-powered full-stack medical portfolio platform.

## Features
- AI Blog Generation via MedEngine API
- Luxury glassmorphism design with Tailwind CSS
- Advanced GSAP and Framer Motion animations
- Lenis Smooth Scrolling
- Secure Node.js/Express backend with Prisma & SQLite
- Interactive Appointment Booking Form

## Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Make sure to configure `backend/.env` with your desired secrets, especially the `AI_API_KEY`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment (VPS)

1. Build both frontend and backend:
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npx tsc
```

2. Start with PM2 (requires PM2 installed globally: `npm install -g pm2`):
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. Setup Nginx:
Copy `nginx.conf` to `/etc/nginx/sites-available/medpreview` and symlink it to `sites-enabled`.
Reload Nginx.
```bash
sudo ln -s /etc/nginx/sites-available/medpreview /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. Enable SSL with Certbot:
```bash
sudo certbot --nginx -d drjonathan.com -d www.drjonathan.com
```
