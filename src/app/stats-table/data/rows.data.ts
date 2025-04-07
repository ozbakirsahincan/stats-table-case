import { RowData } from '../interfaces';

/**
 * Tablo satır verileri
 * Daha fazla satır eklemek için bu dizi genişletilebilir
 */
export const TABLE_ROWS: RowData[] = [
  {
    label: 'Gesamtlaufdistanz in km',
    firstHalf: 1,
    secondHalf: 1,
    total: 2,
    average: 1.5,
    league: 1.8
  },
  {
    label: 'Gesamtlaufdistanz Nettospielzeit in km',
    firstHalf: 1,
    secondHalf: 4,
    total: 5,
    average: 3,
    league: 5.7
  },
  {
    label: 'Tempoläufe',
    firstHalf: 8,
    secondHalf: 8,
    total: 9,
    average: 9,
    league: 9.3
  },
  // Burada daha fazla satır eklenebilir
];
