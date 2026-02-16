import { StaticImageData } from 'next/image';
import tomelaterImg from '@/public/icons/tomelater.png';
import ninedragonsImg from '@/public/icons/ninedragons.png';
import gymImg from '@/public/icons/gym_management.png';
import musicImg from '@/public/icons/apple_music_playlist.png';

export type ProjectType = 'app' | 'web';

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  description: string;
  icon: StaticImageData | string; // Path to icon in public folder
  url?: string;
  storeLinks?: {
    playStore?: string;
    appStore?: string;
  };
  qrCode?: string; // Placeholder for now, we might generate this dynamically or use a static image path
}

export const projects: Project[] = [
  {
    id: 'tomelater',
    type: 'web',
    title: 'Tomelater',
    description: 'Read it later, maybe.',
    icon: tomelaterImg,
    url: 'https://tomelater.gowoobro.com',
  },
  {
    id: 'ninedragons',
    type: 'web',
    title: 'Nine Dragons / Number Change',
    description: 'Predict the future with numbers.',
    icon: ninedragonsImg,
    url: 'https://ninedragons.gowoobro.com',
  },
  {
    id: 'gym',
    type: 'web',
    title: 'Gym Management',
    description: 'Platform for managing your gym business.',
    icon: gymImg,
    url: 'https://gym.gowoobro.com',
  },
  {
    id: 'playlist',
    type: 'web',
    title: 'Apple Playlist',
    description: 'Share your Apple Music playlists.',
    icon: musicImg,
    url: 'https://playlist.gowoobro.com',
  },
  {
    id: 'tomelater',
    type: 'app',
    title: 'Tomelater App',
    description: 'Mobile version of Tomelater.',
    icon: tomelaterImg,
    storeLinks: {
      appStore: 'https://apps.apple.com/us/app/tomelater',
      playStore: 'https://play.google.com/store/apps/details?id=com.tomelater',
    },
  },
  {
    id: 'gym',
    type: 'app',
    title: 'Gym Management',
    description: 'Platform for managing your gym business.',
    icon: gymImg,
    storeLinks: {
      appStore: 'https://apps.apple.com/us/app/gym-management',
      playStore: 'https://play.google.com/store/apps/details?id=com.gym.management',
    },
  },
];
