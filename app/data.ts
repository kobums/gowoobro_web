export type ProjectType = 'app' | 'web';

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  description: string;
  icon: string; // Path to icon in public folder
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
    icon: '/icons/tomelater.png',
    url: 'https://tomelater.gowoobro.com',
  },
  {
    id: 'ninedragons',
    type: 'web',
    title: 'Nine Dragons / Number Change',
    description: 'Predict the future with numbers.',
    icon: '/icons/ninedragons.png',
    url: 'https://ninedragons.gowoobro.com',
  },
  {
    id: 'gym',
    type: 'web',
    title: 'Gym Management',
    description: 'Platform for managing your gym business.',
    icon: '/icons/gym_management.png',
    url: 'https://gym.gowoobro.com',
  },
  {
    id: 'playlist',
    type: 'web',
    title: 'Apple Playlist',
    description: 'Share your Apple Music playlists.',
    icon: '/icons/apple_music_playlist.png',
    url: 'https://playlist.gowoobro.com',
  },
  {
    id: 'tomelater',
    type: 'app',
    title: 'Tomelater App',
    description: 'Mobile version of Tomelater.',
    icon: '/icons/tomelater.png',
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
    icon: '/icons/gym_management.png',
    storeLinks: {
      appStore: 'https://apps.apple.com/us/app/gym-management',
      playStore: 'https://play.google.com/store/apps/details?id=com.gym.management',
    },
  },
];
