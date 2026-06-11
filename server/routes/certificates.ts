import { Router } from 'express';
import { mapToCertificateResponse } from '../lib/mapCertificate.js';
import { normalizeCertificateId } from '../lib/normalizeCertificateId.js';
import { prisma } from '../lib/prisma.js';

export const certificatesRouter = Router();

certificatesRouter.get('/:id', async (req, res) => {
  try {
    const normalizedId = normalizeCertificateId(req.params.id);
    const record = await prisma.nexovateCertificate.findUnique({
      where: { normalizedCertificateNumber: normalizedId },
    });

    if (!record) {
      return res.status(404).json({
        error: 'Sertifikat tidak ditemukan. Pastikan nomor identifikasi sudah benar.',
      });
    }

    return res.json(mapToCertificateResponse(record));
  } catch (error) {
    console.error('Certificate lookup failed:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan sistem internal.' });
  }
});
