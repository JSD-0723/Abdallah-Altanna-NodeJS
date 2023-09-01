import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
  if (req.url !== '/favicon.ico') {
    const currentTime = new Date();
    const requestUrl = req.url;

    const logMessage = `${currentTime} - ${requestUrl}\n`;

    await fs.appendFile('requests.txt', logMessage, err => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Request logged successfully!\n');
  }
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
