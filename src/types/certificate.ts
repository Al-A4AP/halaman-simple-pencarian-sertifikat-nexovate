export interface Certificate {
  id: string;
  participantName: string;
  courseName: string;
  completionDate: string;
  issuer: string;
  verified: boolean;
  qrCodeUrl?: string;
}

/** Kolom header CSV resmi Nexovate */
export interface CertificateCsvRow {
  'Nomor Sertifikat': string;
  Nama: string;
  'Nama Program': string;
  'Waktu Pelaksanaan': string;
}

export interface CertificateService {
  searchById(certId: string): Promise<Certificate>;
}

export type DataSource = 'mock' | 'csv' | 'api';

export class CertificateNotFoundError extends Error {
  constructor(message = 'Sertifikat tidak ditemukan. Pastikan nomor identifikasi sudah benar.') {
    super(message);
    this.name = 'CertificateNotFoundError';
  }
}
