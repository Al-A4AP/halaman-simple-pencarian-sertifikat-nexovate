import { MOCK_CERTIFICATES } from '../data/mockCertificates';
import type { Certificate, CertificateService } from '../types/certificate';
import { CertificateNotFoundError } from '../types/certificate';
import { normalizeCertificateId } from '../utils/normalizeCertificateId';

const SEARCH_DELAY_MS = 600;

function findCertificate(database: Certificate[], certId: string): Certificate | undefined {
  const normalizedQuery = normalizeCertificateId(certId);
  return database.find((cert) => normalizeCertificateId(cert.id) === normalizedQuery);
}

export class MockCertificateService implements CertificateService {
  async searchById(certId: string): Promise<Certificate> {
    await delay(SEARCH_DELAY_MS);

    const result = findCertificate(MOCK_CERTIFICATES, certId);
    if (!result) {
      throw new CertificateNotFoundError();
    }

    return result;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
