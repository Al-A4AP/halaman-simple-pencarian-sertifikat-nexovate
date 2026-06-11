import type { Certificate, CertificateService } from '../types/certificate';
import { CertificateNotFoundError } from '../types/certificate';
import { parseCsv, rowsToCertificates } from '../utils/csvParser';
import { normalizeCertificateId } from '../utils/normalizeCertificateId';

export class CsvCertificateService implements CertificateService {
  private cache: Certificate[] | null = null;
  private readonly csvUrl: string;

  constructor(csvUrl = import.meta.env.VITE_CSV_URL || '/data/certificates.csv') {
    this.csvUrl = csvUrl;
  }

  async searchById(certId: string): Promise<Certificate> {
    const database = await this.loadDatabase();
    const normalizedQuery = normalizeCertificateId(certId);
    const result = database.find((cert) => normalizeCertificateId(cert.id) === normalizedQuery);

    if (!result) {
      throw new CertificateNotFoundError();
    }

    return result;
  }

  private async loadDatabase(): Promise<Certificate[]> {
    if (this.cache) {
      return this.cache;
    }

    const response = await fetch(this.csvUrl);
    if (!response.ok) {
      throw new Error(`Gagal memuat data CSV (${response.status}). Periksa path: ${this.csvUrl}`);
    }

    const text = await response.text();
    this.cache = rowsToCertificates(parseCsv(text));
    return this.cache;
  }
}
