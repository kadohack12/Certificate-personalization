import React from 'react';
import { InstituteLogo } from './InstituteLogo';

interface ArtDeMailleLogoProps {
  className?: string;
  title?: string;
  subtitle?: string;
  accentColor?: string;
}

export const ArtDeMailleLogo: React.FC<ArtDeMailleLogoProps> = ({
  className = '',
  title = "ACADÉMIE D'EXCELLENCE",
  subtitle = "Institut Supérieur des Savoirs",
}) => {
  return <InstituteLogo className={className} title={title} subtitle={subtitle} />;
};
