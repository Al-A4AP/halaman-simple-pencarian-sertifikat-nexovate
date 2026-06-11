import { NEXOVATE_LOGO_URL } from '../config/assets';

interface NexovateLogoProps {
  variant?: 'header' | 'certificate';
  showWordmark?: boolean;
}

export function NexovateLogo({ variant = 'header', showWordmark = true }: NexovateLogoProps) {
  const isCertificate = variant === 'certificate';

  const logoImg = (
    <img
      src={NEXOVATE_LOGO_URL}
      alt="Nexovate"
      className={isCertificate ? 'h-14 w-auto object-contain' : 'h-12 w-auto object-contain'}
    />
  );

  if (isCertificate) {
    return (
      <div className="flex items-center gap-2">
        {logoImg}
        {showWordmark && (
          <span className="font-bold text-2xl tracking-tighter text-slate-900 sr-only">NEXOVATE</span>
        )}
      </div>
    );
  }

  return (
    <a 
      href="https://nexovate.id/"
      className="flex items-center hover:opacity-80 transition-opacity"
      title="Kunjungi Nexovate.id"
    >
      {logoImg}
    </a>
  );
}
