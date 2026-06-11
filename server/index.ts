import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { certificatesRouter } from './routes/certificates.js';

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/certificates', certificatesRouter);

// Global 404 Handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
  });
}

export default app;
