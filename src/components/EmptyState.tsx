import { ShieldCheck } from 'lucide-react';

interface EmptyStateProps {
  onUseExample: () => void;
}

export function EmptyState({ onUseExample }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4 rounded-3xl border border-slate-200 bg-white shadow-sm mt-8 transition-all duration-300">
      <div className="bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner border border-slate-100">
        <ShieldCheck className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800">Verifikasi Kredensial</h3>
      <p className="text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        Sistem verifikasi resmi Nexovate. Masukkan nomor sertifikat yang valid untuk memvalidasi kepesertaan dan kelulusan program.
      </p>
      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Contoh Format</span>
        <button
          type="button"
          onClick={onUseExample}
          className="text-sm font-mono text-[#115da7] bg-[#115da7]/5 hover:bg-[#115da7]/10 px-4 py-1.5 rounded-lg transition-colors border border-[#115da7]/20"
        >
          109A/DKS-JT/NS/03/IX/2025
        </button>
      </div>
    </div>
  );
}
