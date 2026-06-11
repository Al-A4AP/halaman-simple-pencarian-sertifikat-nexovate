import type { Certificate, CertificateService } from '../types/certificate';
import { CertificateNotFoundError } from '../types/certificate';

export class ApiCertificateService implements CertificateService {
  private readonly baseUrl: string;

  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL || '/api') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async searchById(certId: string): Promise<Certificate> {
    const encodedId = encodeURIComponent(certId);
    const response = await fetch(`${this.baseUrl}/certificates/${encodedId}`);

    if (response.status === 404) {
      throw new CertificateNotFoundError();
    }

    if (!response.ok) {
      throw new Error(`Gagal memverifikasi sertifikat (${response.status}).`);
    }

    const data: Certificate = await response.json();
    return data;
  }
}
