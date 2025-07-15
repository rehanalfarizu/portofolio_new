# 🚀 Raihan Portfolio - Full Stack Application

Portfolio website dengan backend Node.js/Express dan frontend Vue.js.

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn
- Git

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd portofolio_new
```

### 2. Install Dependencies untuk Root Project
```bash
npm install
```

### 3. Install Dependencies untuk Backend dan Frontend
```bash
npm run install-all
```

## 🚀 Running the Application

### Cara 1: Menjalankan Backend dan Frontend Bersamaan (Recommended)
```bash
npm run dev
```
Ini akan menjalankan:
- Backend di: http://localhost:3000
- Frontend di: http://localhost:5173

### Cara 2: Menjalankan Backend dan Frontend Secara Terpisah

#### Menjalankan Backend
```bash
cd portofolio_backend
node server.js
```
Backend akan berjalan di: http://localhost:3000

#### Menjalankan Frontend (di terminal terpisah)
```bash
cd portofolio_frontend
npm run dev
```
Frontend akan berjalan di: http://localhost:5173

## 🔧 Configuration

### Backend Configuration (.env)
File `.env` sudah dikonfigurasi untuk development:
- Database: Disabled (menggunakan mock data)
- CORS: Mengizinkan localhost:5173
- Port: 3000

### Frontend Configuration (.env)
- API URL: http://localhost:3000
- Development mode: Aktif

## 📡 API Endpoints

- `GET /api/health` - Health check
- `GET /api/contact/test` - Test koneksi
- `GET /api/contact` - Get semua pesan
- `POST /api/contact` - Kirim pesan baru
- `GET /api/contact/stats` - Statistik pesan

## 🧪 Testing Connection

1. Buka browser ke: http://localhost:5173/contact
2. Klik tombol "Test Backend Connection"
3. Jika berhasil, akan muncul pesan sukses

## 🗂️ Project Structure

```
portofolio_new/
├── portofolio_backend/          # Backend (Node.js + Express)
│   ├── controllers/             # Logic controllers
│   ├── routes/                  # API routes
│   ├── models/                  # Database models
│   ├── middleware/              # Custom middleware
│   ├── .env                     # Environment variables
│   └── server.js                # Main server file
├── portofolio_frontend/         # Frontend (Vue.js + Vite)
│   ├── src/
│   │   ├── views/               # Vue pages
│   │   ├── components/          # Vue components
│   │   ├── services/            # API services
│   │   └── main.js              # Main Vue app
│   └── .env                     # Frontend environment
└── package.json                 # Root package.json untuk menjalankan keduanya
```

## 🐛 Troubleshooting

### Backend tidak bisa diakses
1. Pastikan backend berjalan di port 3000: `node server.js`
2. Cek log terminal untuk error
3. Pastikan file .env dikonfigurasi dengan benar

### Frontend tidak bisa connect ke backend
1. Pastikan backend berjalan terlebih dahulu
2. Cek network tab di browser developer tools
3. Test koneksi dengan tombol "Test Backend Connection"

### CORS Error
CORS sudah dikonfigurasi untuk mengizinkan localhost:5173. Jika masih error:
1. Restart backend server
2. Clear browser cache
3. Pastikan frontend berjalan di port 5173

## 📝 Development Notes

- Database saat ini disabled untuk memudahkan development
- Menggunakan mock data untuk contact messages
- HTTPS belum dikonfigurasi (development only)
- Error handling sudah diimplementasi di frontend dan backend

## 🚀 Production Deployment

### Backend
1. Set environment variables di production
2. Enable database jika diperlukan
3. Configure CORS untuk domain production

### Frontend
```bash
cd portofolio_frontend
npm run build
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📞 Support

Jika ada masalah dalam menjalankan aplikasi, pastikan:
1. Node.js sudah terinstall
2. Semua dependencies sudah terinstall
3. Backend dan frontend berjalan di port yang benar
4. Tidak ada konflik port dengan aplikasi lain