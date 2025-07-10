const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // Gantikan body-parser

// Koneksi PostgreSQL
const sequelize = new Sequelize('portofolio_db', 'postgres', 'password_kamu', {
  host: 'localhost',
  dialect: 'postgres',
})

// Cek koneksi
sequelize.authenticate()
  .then(() => console.log('🟢 PostgreSQL Connected'))
  .catch(err => console.error('🔴 Connection Error:', err))

// Model User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

// Sinkron DB
sequelize.sync({ alter: true })

// GET semua user
app.get('/api/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// POST user baru
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body
    const newUser = await User.create({ name, email })
    res.json(newUser)
  } catch (error) {
    console.error('❌ Error saat menambah user:', error)
    res.status(500).json({ error: 'Gagal tambah user' })
  }
})

// Mulai server
app.listen(3000, () => {
  console.log('🚀 Server berjalan di http://localhost:3000')
})
