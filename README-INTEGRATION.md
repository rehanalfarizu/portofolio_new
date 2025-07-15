# 🚀 Portfolio Project - Integration Guide

## ✅ STATUS INTEGRASI
- ✅ Backend API terintegrasi dengan Frontend
- ✅ Mock data system untuk development tanpa PostgreSQL
- ✅ Authentication system working
- ✅ All CRUD operations functional
- ✅ Responsive design implemented
- ✅ Search duplication fixed

## 🛠️ STRUKTUR PROJECT

```
C:\portofolio_new\
├── portofolio_backend\         # Node.js + Express API Server
│   ├── routes\                 # API Routes with Mock Data Support
│   ├── controllers\            # Request Handlers
│   ├── models\                 # Database Models (Sequelize)
│   ├── utils\                  # Utilities & Mock Data
│   ├── config\                 # Database Configuration
│   ├── .env                    # Environment Variables
│   ├── server.js               # Main Server File
│   └── package.json            # Backend Dependencies
│
├── portofolio_frontend\        # Vue.js Frontend Application
│   ├── src\
│   │   ├── views\              # Vue Pages
│   │   ├── components\         # Vue Components
│   │   ├── services\           # API Services
│   │   ├── router\             # Vue Router
│   │   └── assets\             # Static Assets
│   ├── .env                    # Frontend Environment
│   ├── vite.config.js          # Vite Configuration
│   └── package.json            # Frontend Dependencies
│
├── start-servers.bat           # 🚀 Startup Script
├── cleanup.bat                 # 🧹 Cleanup Script
└── README-INTEGRATION.md       # This file
```

## 🎯 CARA MENJALANKAN PROJECT

### Method 1: Otomatis (Recommended)
1. **Double-click** pada `start-servers.bat`
2. Tunggu hingga kedua server berjalan
3. Browser akan otomatis terbuka ke `http://localhost:5173`

### Method 2: Manual
```bash
# Terminal 1 - Backend
cd C:\portofolio_new\portofolio_backend
npm start

# Terminal 2 - Frontend  
cd C:\portofolio_new\portofolio_frontend
npm run dev
```

## 🌐 AKSES APLIKASI

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Vue.js Application |
| **Backend API** | http://localhost:3000 | Express API Server |
| **Health Check** | http://localhost:3000/api/health | Server Status |

## 🔐 LOGIN CREDENTIALS

```
Email:    admin@portfolio.com
Password: admin123
```

## 📡 API ENDPOINTS

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/verify` - Token verification

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics

### Projects Management
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills Management
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience Management
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### About/Biodata Management
- `GET /api/biodata` - Get biodata
- `POST /api/biodata` - Create biodata
- `PUT /api/biodata/:id` - Update biodata
- `DELETE /api/biodata/:id` - Delete biodata

### Contact Messages
- `GET /api/contact` - Get all messages
- `POST /api/contact` - Send new message
- `GET /api/contact/stats` - Contact statistics

## 🗄️ DATABASE MODE

### Current: Mock Data Mode
- ✅ **USE_DATABASE=false** dalam `.env`
- ✅ Tidak perlu PostgreSQL
- ✅ Data tersimpan dalam memory (restart = reset)
- ✅ Ideal untuk development dan testing

### Future: PostgreSQL Mode
Untuk menggunakan PostgreSQL:
1. Install PostgreSQL dan pgAdmin4
2. Buat database `portofolio_db`
3. Update `.env`: `USE_DATABASE=true`
4. Update password database di `.env`
5. Restart backend server

## ✨ FITUR YANG SUDAH TERINTEGRASI

### ✅ Frontend Features
- ✅ Responsive design (mobile-friendly)
- ✅ Dashboard dengan statistik lengkap
- ✅ CRUD management untuk semua data
- ✅ Authentication system
- ✅ Search functionality (tanpa duplikasi)
- ✅ About section management
- ✅ Contact form
- ✅ Modern UI dengan Tailwind CSS

### ✅ Backend Features
- ✅ RESTful API architecture
- ✅ Mock data system
- ✅ JWT authentication
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling
- ✅ Security middleware (Helmet)
- ✅ Request logging (Morgan)

### ✅ Integration Features
- ✅ Frontend-Backend communication
- ✅ API error handling
- ✅ Loading states
- ✅ Notification system
- ✅ Responsive pagination
- ✅ Real-time updates

## 🐛 TROUBLESHOOTING

### Port 3000 sudah digunakan
```bash
# Cek process yang menggunakan port
netstat -ano | findstr :3000

# Kill process (ganti PID dengan actual PID)
taskkill /F /PID [PID_NUMBER]
```

### Frontend tidak connect ke Backend
1. Pastikan backend berjalan di port 3000
2. Cek `.env` di frontend: `VITE_API_URL=http://localhost:3000`
3. Restart kedua server

### CORS Error
- Sudah dikonfigurasi di backend
- Pastikan frontend menggunakan `http://localhost:5173`

## 📦 DEPENDENCIES

### Backend
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5", 
  "helmet": "^7.0.0",
  "morgan": "^1.10.0",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^9.0.0",
  "sequelize": "^6.32.1",
  "pg": "^8.11.0"
}
```

### Frontend
```json
{
  "vue": "^3.3.4",
  "vue-router": "^4.2.4",
  "axios": "^1.4.0",
  "@tailwindcss/forms": "^0.5.4",
  "vite": "^4.4.5"
}
```

## 🎉 NEXT STEPS

1. **Development**: Gunakan mock data mode (current setup)
2. **Production**: Setup PostgreSQL database
3. **Deployment**: Deploy ke hosting (Vercel/Netlify + Railway/Heroku)
4. **Enhancement**: Tambah fitur baru sesuai kebutuhan

---

## 🚀 QUICK START

```bash
# Clone dan setup (jika belum)
cd C:\portofolio_new

# Install dependencies
cd portofolio_backend && npm install
cd ..\portofolio_frontend && npm install

# Start servers
cd ..
start-servers.bat
```

**Enjoy your integrated portfolio project! 🎉**
