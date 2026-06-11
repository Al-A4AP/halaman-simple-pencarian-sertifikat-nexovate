import type { CertificateService, DataSource } from '../types/certificate';
import { ApiCertificateService } from './apiCertificateService';
import { CsvCertificateService } from './csvCertificateService';
import { MockCertificateService } from './mockCertificateService';

export function getDataSource(): DataSource {
  const source = import.meta.env.VITE_DATA_SOURCE;
  if (source === 'csv' || source === 'api' || source === 'mock') {
    return source;
  }
  return 'api';
}

export function createCertificateService(): CertificateService {
  switch (getDataSource()) {
    case 'csv':
      return new CsvCertificateService();
    case 'api':
      return new ApiCertificateService();
    default:
      return new MockCertificateService();
  }
}

export const certificateService = createCertificateService();
