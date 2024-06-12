const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akademik'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database', err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Endpoint to get all mahasiswa data
app.get('/api/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Endpoint to add a new mahasiswa
app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, jurusan, angkatan } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan, angkatan) VALUES (?, ?, ?, ?)';
    db.query(sql, [nim, nama, jurusan, angkatan], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Data berhasil disimpan', data: results });
    });
});

// Endpoint to update an existing mahasiswa
app.put('/api/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params;
    const { nama, jurusan, angkatan } = req.body;
    const sql = 'UPDATE mahasiswa SET nama = ?, jurusan = ?, angkatan = ? WHERE nim = ?';
    db.query(sql, [nama, jurusan, angkatan, nim], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Data berhasil diperbarui', data: results });
    });
});

// Endpoint to delete a mahasiswa
app.delete('/api/mahasiswa/:nim', (req, res) => {
    const { nim } = req.params;
    const sql = 'DELETE FROM mahasiswa WHERE nim = ?';
    db.query(sql, [nim], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Data berhasil dihapus', data: results });
    });
});
