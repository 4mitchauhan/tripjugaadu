import { Backpack, Shirt, CheckCircle2, Compass, Info, CloudSun, HelpCircle } from 'lucide-react';

interface KbygIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export default function KbygIcon({ icon, size = 26, className = 'text-[var(--color-accent)]' }: KbygIconProps) {
  const props = { size, strokeWidth: 1.8, className };

  switch (icon) {
    case 'backpack':
      return <Backpack {...props} />;
    case 'shirt':
      return <Shirt {...props} />;
    case 'check-circle':
      return <CheckCircle2 {...props} />;
    case 'compass':
      return <Compass {...props} />;
    case 'info':
      return <Info {...props} />;
    case 'cloud-sun':
      return <CloudSun {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
}
