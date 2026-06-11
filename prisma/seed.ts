import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { rowsToCertificates, parseCsv } from '../src/utils/csvParser';
import { normalizeCertificateId } from '../server/lib/normalizeCertificateId';

const prisma = new PrismaClient();

async function main() {
  const csvPath = join(process.cwd(), 'prisma', 'data', 'certificates.csv');
  const csvText = readFileSync(csvPath, 'utf-8');
  const certificates = rowsToCertificates(parseCsv(csvText));

  console.log(`Seeding ${certificates.length} certificates into nexovate_certificates...`);

  const baseUrl = process.env.FRONTEND_URL || 'https://nexovate.id';

  for (const cert of certificates) {
    const verificationUrl = `${baseUrl}/?id=${encodeURIComponent(cert.id)}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=0f172a&data=${encodeURIComponent(verificationUrl)}`;

    await prisma.nexovateCertificate.upsert({
      where: { certificateNumber: cert.id },
      create: {
        certificateNumber: cert.id,
        normalizedCertificateNumber: normalizeCertificateId(cert.id),
        participantName: cert.participantName,
        courseName: cert.courseName,
        completionDate: cert.completionDate,
        issuer: cert.issuer,
        verified: cert.verified,
        qrCodeUrl: qrCodeUrl,
      },
      update: {
        normalizedCertificateNumber: normalizeCertificateId(cert.id),
        participantName: cert.participantName,
        courseName: cert.courseName,
        completionDate: cert.completionDate,
        issuer: cert.issuer,
        verified: cert.verified,
        qrCodeUrl: qrCodeUrl,
      },
    });
  }

  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
