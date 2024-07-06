import { TKaps } from '../types';

export const mockedKaps: TKaps[] = [
  {
    name: 'Les français en Espagne',
    id: '1',
    description: 'Tous les français en Espagne sont les bienvenus !',
    emoji: '🇪🇸',
    imageUrl: "https://www.francaisaletranger.fr/wp-content/uploads/2021/01/Sans-titre-47-1-1200x900.jpg",
    isAdmin: true,
    members: 30689,
    creator: 'nicoalz',
  }, {
    name: 'La Folie des Road Trips',
    id: '2',
    description: 'Bienvenue chez les Roadtrip Fous Furieux ! Rejoignez-nous pour voyager et rigoler 😹🚐',
    emoji: '🚐',
    imageUrl: "https://www.vilebrequin.com/on/demandware.static/-/Library-Sites-VBQ-shared-library/default/dwf9a1161a/images/blog/Destinations/Top10-roadtrip/main-visuel-3x2-768.jpg",
    isAdmin: false,
    members: 12419,
    creator: '10gust10',
  },
   {
    name: 'Tips pour voyager',
    id: '3',
    description: 'Ici on partage nos meilleurs tips pour voyager !',
    emoji: '🌍',
    imageUrl: "https://www.okvoyage.com/wp-content/uploads/2017/01/voyager-moins-cher-astuces-budget.jpeg",
    isAdmin: false,
    members: 104941,
    creator: 'N0rooo',
  }
]
