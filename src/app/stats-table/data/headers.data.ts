import { HeaderItem } from '../interfaces';

/**
 * Tablo başlık verileri
 */
export const TABLE_HEADERS: HeaderItem[] = [
  {
    label: '1. HZ',
    icon: {
      type: 'square',
      color: 'bg-yellow-400'
    }
  },
  {
    label: '2. HZ',
    icon: {
      type: 'square',
      color: 'bg-black'
    }
  },
  {
    label: '90 Min Durchs.',
    icon: {
      type: 'emoji',
      content: '⏱'
    },
    showVerticalLine: true
  },
  {
    label: 'Gesamtes Spiel'
  },
  {
    label: 'Ø Saison',
    icon: {
      type: 'circle',
      color: 'bg-yellow-400',
      content: 'BVB',
      textColor: 'text-[6px] font-bold'
    }
  },
  {
    label: 'Ø Liga',
    icon: {
      type: 'text',
      content: 'L',
      textColor: 'text-red-600 text-xs font-bold'
    }
  }
];
