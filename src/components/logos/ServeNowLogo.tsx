import React from 'react';
import { CertificationLogo } from './CertificationLogo';

interface ServeNowLogoProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const ServeNowLogo: React.FC<ServeNowLogoProps> = ({
  className = '',
  title = 'QUALITAS GLOBAL',
  subtitle = "Organisme d'Accréditation",
}) => {
  return <CertificationLogo className={className} title={title} subtitle={subtitle} />;
};
