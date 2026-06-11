import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

interface SearchFormProps {
  searchQuery: string;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function SearchForm({ searchQuery, isLoading, onQueryChange, onSubmit }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="relative max-w-3xl mx-auto no-print">
      <div className="relative flex flex-col sm:block gap-3">
        <div className="relative flex items-center bg-white shadow-sm rounded-2xl overflow-hidden ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-[#115da7] transition-shadow">
          <div className="absolute left-5 text-[#e61c24]">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Contoh: 109A/DKS-JT/NS/03/IX/2025"
            className="w-full py-4 sm:py-5 pl-14 pr-4 sm:pr-36 text-base sm:text-lg text-slate-900 outline-none bg-transparent placeholder:text-slate-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="hidden sm:flex absolute right-2 top-2 bottom-2 bg-[#115da7] hover:bg-[#0c4b8a] disabled:bg-slate-100 disabled:text-slate-400 text-white px-8 rounded-xl font-medium transition-all items-center gap-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Cari'
            )}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="sm:hidden w-full bg-[#115da7] hover:bg-[#0c4b8a] disabled:bg-slate-100 disabled:text-slate-400 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            'Cari'
          )}
        </button>
      </div>
    </form>
  );
}
