import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Idaara.tn · إدارة.تونس',
    short_name: 'Idaara',
    description: 'Le premier copilote citoyen et scanner administratif intelligent en Tunisie.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090a0d',
    theme_color: '#00C07F',
    lang: 'fr',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    shortcuts: [
      {
        name: 'Idaara Copilot',
        short_name: 'Copilot',
        description: 'Discutez avec le copilote administratif en Derja ou Français',
        url: '/copilot',
      },
      {
        name: 'Fasserli (Scanner OCR)',
        short_name: 'Fasserli',
        description: 'Scannez et décodez vos courriers administratifs',
        url: '/fasserli',
      },
      {
        name: 'Calculateur Timbres',
        short_name: 'Calculateur',
        description: 'Calculez le coût légal des timbres et démarches',
        url: '/calculator',
      },
      {
        name: 'Modèles PDF',
        short_name: 'Documents',
        description: 'Générez des contrats et attestations officiels',
        url: '/documents',
      },
    ],
  };
}
