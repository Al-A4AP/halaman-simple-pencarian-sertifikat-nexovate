import type { Certificate } from '../types/certificate';

const DEFAULT_ISSUER = 'Nexovate';

export function mapCsvRowToCertificate(row: Record<string, string>): Certificate | null {
  const id = row['Nomor Sertifikat']?.trim();
  const participantName = row['Nama']?.trim();
  const courseName = row['Nama Program']?.trim();
  const completionDate = row['Waktu Pelaksanaan']?.trim();

  if (!id || !participantName || !courseName || !completionDate) {
    return null;
  }

  return {
    id,
    participantName,
    courseName,
    completionDate,
    issuer: DEFAULT_ISSUER,
    verified: true,
  };
}

/** Parser CSV sederhana yang mendukung field ber-quote */
export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    rows.push(row);
  }

  return rows;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values.map((value) => value.trim());
}

export function rowsToCertificates(rows: Record<string, string>[]): Certificate[] {
  return rows
    .map(mapCsvRowToCertificate)
    .filter((cert): cert is Certificate => cert !== null);
}
