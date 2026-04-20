
# StayAt – Hotel Booking Platform

![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/stack-MERN-green)
![Status](https://img.shields.io/badge/status-Active-success)
![Frontend](https://img.shields.io/badge/frontend-React%20%7C%20Vite-blue)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express-lightgrey)
![Database](https://img.shields.io/badge/database-MongoDB-green)
![Payments](https://img.shields.io/badge/payments-Stripe-purple)


---

## Live Demo

- Frontend: https://your-frontend-url.vercel.app
- Backend API: https://your-backend-url.onrender.com

---

## Overview

A scalable full-stack hotel booking platform built using the MERN stack. Users can search hotels, check real-time availability, and securely book rooms. The system is designed with a modern UI and production-ready backend.

---

## Key Highlights

- Developed a full-stack booking platform using MERN stack  
- Implemented real-time availability tracking for multiple properties  
- Integrated Clerk authentication for secure user management  
- Built payment workflow using Stripe API  
- Designed RESTful APIs for bookings, users, and hotels  
- Optimized frontend using Vite and Tailwind CSS  
- Enabled image uploads via Cloudinary  

---

## Features

- Hotel search and filtering  
- Room availability management  
- Booking system with date selection  
- Authentication and authorization  
- Secure payment integration  
- Admin dashboard for hotel management  
- Responsive UI  

---

## Screenshots

### Home Page
![Home](./screenshots/home.png)

### Hotel Listing
![Hotels](./screenshots/hotels.png)

### Booking Flow
![Booking](./screenshots/booking.png)

### Admin Dashboard
![Dashboard](./screenshots/dashboard.png)

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router  

**Backend**
- Node.js
- Express.js  

**Database**
- MongoDB  

**Integrations**
- Clerk Authentication  
- Stripe Payments  
- Cloudinary Storage  

---

## Project Structure

```

StayAt/
├── client/
├── api/
├── server/
└── README.md

````

---

## Installation

### Clone Repository
```bash
git clone https://github.com/your-username/StayAt.git
cd StayAt
````

### Backend Setup

```bash
cd api
npm install
```

Create `.env` file:

```env
MONGO_URI=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Future Enhancements

* Reviews and ratings system
* AI-based hotel recommendations
* Advanced analytics dashboard
* Multi-language support

---

## License

MIT License

```
