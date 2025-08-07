const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = 3000;


app.use(express.text());

app.post('/marina', (req, res) => {
  const prop = req.body;

  if (!prop || typeof prop !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prop in body' });
  }

  execFile('./marina', [prop], (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'marina execution failed', details: stderr });
    }
    res.json({ result: stdout.trim() });
  });
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Marina API running at http://localhost:${port}`);
});
