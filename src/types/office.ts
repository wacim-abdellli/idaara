import { LocalizedString } from '../lib/locale-utils';

export type OfficeCategory =
  | 'baladiya'
  | 'recette_finances'
  | 'poste'
  | 'cnss'
  | 'cnam'
  | 'attt'
  | 'police_garde'
  | 'rne'
  | 'douane'
  | 'steg'
  | 'sonede'
  | 'tribunal'
  | 'aneti'
  | 'hopital'
  | 'ministere'
  | 'onas';

export type Governorate =
  | 'Tunis'
  | 'Ariana'
  | 'Ben Arous'
  | 'Manouba'
  | 'Nabeul'
  | 'Zaghouan'
  | 'Bizerte'
  | 'Béja'
  | 'Jendouba'
  | 'Le Kef'
  | 'Siliana'
  | 'Sousse'
  | 'Monastir'
  | 'Mahdia'
  | 'Sfax'
  | 'Kairouan'
  | 'Kasserine'
  | 'Sidi Bouzid'
  | 'Gabès'
  | 'Médenine'
  | 'Tataouine'
  | 'Gafsa'
  | 'Tozeur'
  | 'Kébili';

export interface OfficeSchedule {
  regular: {
    days: string;
    hours: string;
  };
  ramadan: {
    days: string;
    hours: string;
  };
  summer: {
    days: string;
    hours: string;
  };
}

export interface PublicOffice {
  id: string;
  name: LocalizedString;
  category: OfficeCategory;
  governorate: Governorate;
  delegation: string;
  address: string;
  phone?: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  schedule: OfficeSchedule;
  hasConformeService: boolean;
  hasTimbreVendor: boolean;
  tips?: LocalizedString;
  website?: string;
  onlinePortal?: string;
  services?: string[];
}
