import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mt-6 max-w-3xl mx-auto bg-red-50 ring-1 ring-red-200 rounded-2xl p-4 flex items-start gap-3 no-print">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold text-red-900">Pencarian Tidak Ditemukan</h4>
        <p className="text-sm text-red-700 mt-1">{message}</p>
      </div>
    </div>
  );
}
