import type { NexovateCertificate } from '@prisma/client';

export interface CertificateResponse {
  id: string;
  participantName: string;
  courseName: string;
  completionDate: string;
  issuer: string;
  verified: boolean;
  qrCodeUrl?: string;
}

export function mapToCertificateResponse(record: NexovateCertificate): CertificateResponse {
  return {
    id: record.certificateNumber,
    participantName: record.participantName,
    courseName: record.courseName,
    completionDate: record.completionDate,
    issuer: record.issuer,
    verified: record.verified,
    qrCodeUrl: record.qrCodeUrl || undefined,
  };
}
