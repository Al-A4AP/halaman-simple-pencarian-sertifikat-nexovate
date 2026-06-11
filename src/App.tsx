import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { CertificateView } from './components/CertificateView';
import { EmptyState } from './components/EmptyState';
import { ErrorAlert } from './components/ErrorAlert';
import { NexovateLogo } from './components/NexovateLogo';
import { SearchForm } from './components/SearchForm';
import { certificateService } from './services';
import type { Certificate } from './types/certificate';

const EXAMPLE_CERTIFICATE_ID = '109A/DKS-JT/NS/03/IX/2025';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  const triggerSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setCertificate(null);

    try {
      const data = await certificateService.searchById(query);
      setCertificate(data);

      const newUrl = `${window.location.pathname}?id=${encodeURIComponent(data.id)}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem internal.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id');
    if (idFromUrl) {
      setSearchQuery(idFromUrl);
      void triggerSearch(idFromUrl);
    }
  }, [triggerSearch]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    void triggerSearch(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#115da7]/20 selection:text-[#115da7] print:min-h-0 print:bg-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <NexovateLogo variant="header" />
          </div>
          <div className="text-sm sm:text-base font-semibold text-slate-400 uppercase tracking-widest border-l-2 border-slate-200 pl-4 sm:pl-6">
            Credential
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 print:py-0 print:px-0 print:max-w-none">
        <div className="text-center mb-10 no-print">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
            Portal Validasi Sertifikat
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Masukkan nomor identifikasi unik untuk memverifikasi keabsahan dokumen dan sertifikat kelulusan.
          </p>
        </div>

        <SearchForm
          searchQuery={searchQuery}
          isLoading={isLoading}
          onQueryChange={setSearchQuery}
          onSubmit={handleSearch}
        />

        {error && <ErrorAlert message={error} />}
        {!isLoading && !error && !certificate && (
          <EmptyState onUseExample={() => {
            setSearchQuery(EXAMPLE_CERTIFICATE_ID);
            void triggerSearch(EXAMPLE_CERTIFICATE_ID);
          }} />
        )}
        {certificate && <CertificateView certificate={certificate} />}
      </main>
    </div>
  );
}
