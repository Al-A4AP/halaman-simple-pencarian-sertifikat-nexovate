import { CheckCircle2, Download } from 'lucide-react';
import { CERTIFICATE_SIGNATORY } from '../config/certificateDisplay';
import type { Certificate } from '../types/certificate';
import { NexovateLogo } from './NexovateLogo';

interface CertificateViewProps {
  certificate: Certificate;
}

export function CertificateView({ certificate }: CertificateViewProps) {
  const verificationUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(certificate.id)}`;

  return (
    <div className="mt-8 print:mt-0 certificate-enter">
      <div className="flex justify-end mb-4 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#115da7] hover:bg-[#0c4b8a] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-md"
        >
          <Download className="w-4 h-4" />
          Unduh Dokumen
        </button>
      </div>

      <div className="bg-white p-8 sm:p-14 rounded-3xl shadow-[0_20px_60px_-15px_rgba(17,93,167,0.15)] border border-slate-100 relative overflow-hidden print:shadow-none print:border-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#115da7]/5 rounded-bl-full z-0 opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e61c24]/5 rounded-tr-full z-0" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <NexovateLogo variant="certificate" showWordmark={false} />
            </div>

            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Kredensial Resmi</h2>
              <p className="text-slate-900 font-mono text-sm bg-slate-100 px-3 py-1 rounded-md inline-block">
                ID: {certificate.id}
              </p>
            </div>
          </div>

          <div className="text-center py-4">
            <p className="text-slate-500 mb-3 uppercase tracking-widest text-sm font-medium">
              Sertifikat ini diberikan kepada
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-serif leading-tight max-w-3xl mx-auto">
              {certificate.participantName}
            </h3>

            <p className="text-slate-500 mb-3 uppercase tracking-widest text-sm font-medium">
              Atas Partisipasi Pada Program
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#115da7] mb-10 max-w-2xl mx-auto leading-relaxed">
              {certificate.courseName}
            </h4>

            <div className="inline-flex items-center gap-8 bg-white shadow-sm ring-1 ring-slate-100 rounded-xl px-8 py-4 mb-12">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Periode</p>
                <p className="font-semibold text-slate-800">{certificate.completionDate}</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className="font-semibold text-emerald-600">Selesai</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mt-8 pt-8 gap-10 sm:gap-0">
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-56 mb-3 border-b-2 border-slate-800 pb-2">
                <p className="font-serif italic text-slate-700 text-lg leading-tight">
                  {CERTIFICATE_SIGNATORY.name}
                </p>
              </div>
              <p className="font-bold text-slate-900 text-lg">{CERTIFICATE_SIGNATORY.title}</p>
              <p className="text-sm font-medium text-slate-500">{CERTIFICATE_SIGNATORY.organization}</p>
            </div>

            <div className="flex items-end gap-6 sm:gap-8 shrink-0">
              {certificate.verified && (
                <div className="flex flex-col items-center justify-end pb-1 shrink-0">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-2xl mb-2 shadow-sm ring-1 ring-emerald-600/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Tervalidasi</p>
                </div>
              )}

              <div className="flex flex-col items-center border-l-2 border-slate-100 pl-6 sm:pl-8 shrink-0">
                <img
                  src={certificate.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=0f172a&data=${encodeURIComponent(verificationUrl)}`}
                  alt={`QR Code Verifikasi ${certificate.id}`}
                  className="w-[72px] h-[72px] mb-2 p-1.5 border border-slate-200 rounded-xl shadow-sm bg-white shrink-0 print:border-slate-800"
                  crossOrigin="anonymous"
                />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center leading-tight print:text-slate-800">
                  Scan untuk
                  <br />
                  Verifikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
