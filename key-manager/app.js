const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const app = express();
app.use(bodyParser.json());

const masterKey = fs.readFileSync('master.key', 'utf8');

app.post('/encrypt-dek', (req, res) => {
    const { dek } = req.body;

    if (!dek) {
        return res.status(400).json({ error: 'Missing dek in request body' });
    }

    const encryptedDek = CryptoJS.AES.encrypt(dek, masterKey).toString();

    res.json({ encryptedDek });
});

app.post('/decrypt-dek', (req, res) => {
    const { encryptedDek } = req.body;

    if (!encryptedDek) {
        return res.status(400).json({ error: 'Missing encryptedDek in request body' });
    }

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedDek, masterKey);
        const decryptedDek = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedDek) {
            throw new Error('Decryption failed');
        }

        res.json({ dek: decryptedDek });
    } catch (error) {
        res.status(500).json({ error: 'Failed to decrypt DEK', details: error.message });
    }
});

const PORT = 8008;
app.listen(PORT, () => console.log(`Key Manager running on port ${PORT}`));