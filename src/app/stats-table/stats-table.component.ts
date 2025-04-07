import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Çubuk stili için arayüz
interface BarStyle {
  width: number;
  clipPath?: string;
  left?: number;
}

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.css']
})
export class StatsTableComponent {
  // Üç başlık satırı
  rows = [
    {
      label: 'Gesamtlaufdistanz in km',
      firstHalf: 1,       // 1. HZ
      secondHalf: 1,      // 2. HZ
      total: 2,           // Gesamtes Spiel
      average: 1.5,       // Ø Saison
      league: 1.8         // Ø Liga
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
    }
  ];

  // Çubukların genişlik hesaplamasında kullanılacak temel değerler
  readonly barContainerWidth: number = 500; // Daha geniş container (px)
  readonly maxBarWidth: number = this.barContainerWidth * 0.85; // Daha geniş maksimum genişlik
  readonly clipOffset: number = 15; // Kesişim noktaları için offset (daha belirgin)

  // İlk satır için çubuk genişlikleri (özelleştirilmiş)
  getFirstRowBars(isFirstHalf: boolean): BarStyle {
    // Gesamtlaufdistanz in km - genişlikleri artırdık
    const firstHalfWidth = this.maxBarWidth * 0.45; // İlk yarı genişliği (sarı)
    const secondHalfWidth = this.maxBarWidth * 0.45; // İkinci yarı genişliği (siyah)

    if (isFirstHalf) {
      return {
        width: firstHalfWidth,
        // Sarı çubuğun sağ tarafı yukarıdan aşağıya eğimli
        clipPath: `polygon(0 0, 100% 0, calc(100% - ${this.clipOffset}px) 100%, 0 100%)`
      };
    } else {
      return {
        width: secondHalfWidth,
        // Kesişimin tam orta noktasından başlat, biraz daha sağa kaydır (boşluk oluşturur)
        left: firstHalfWidth - (this.clipOffset * 0.7),
        // Siyah çubuğun sol tarafı sağdan sola eğimli, sağ tarafı ok şeklinde
        clipPath: `polygon(0 100%, ${this.clipOffset}px 0, calc(100% - ${this.clipOffset}px) 0, 100% 45%, calc(100% - ${this.clipOffset}px) 100%)`
      };
    }
  }

  // İkinci satır için çubuk genişlikleri (özelleştirilmiş)
  getSecondRowBars(isFirstHalf: boolean): BarStyle {
    // Daha keskin fark - sarı çok kısa, siyah çok uzun
    const firstHalfWidth = this.maxBarWidth * 0.15; // Sarı çubuk kısa
    const secondHalfWidth = this.maxBarWidth * 0.75; // Siyah çubuk uzun

    if (isFirstHalf) {
      return {
        width: firstHalfWidth,
        // Sarı çubuğun sağ tarafı yukarıdan aşağıya eğimli
        clipPath: `polygon(0 0, 100% 0, calc(100% - ${this.clipOffset}px) 100%, 0 100%)`
      };
    } else {
      return {
        width: secondHalfWidth,
        // Kesişimin tam orta noktasından başlat, biraz daha sağa kaydır (boşluk oluşturur)
        left: firstHalfWidth - (this.clipOffset * 0.5),
        // Siyah çubuğun sol tarafı sağdan sola eğimli, sağ tarafı daha uzun ok
        clipPath: `polygon(0 100%, ${this.clipOffset}px 0, calc(100% - ${this.clipOffset * 2}px) 0, 100% 50%, calc(100% - ${this.clipOffset * 2}px) 100%)`
      };
    }
  }

  // Üçüncü satır için çubuk genişlikleri (özelleştirilmiş)
  getThirdRowBars(isFirstHalf: boolean): BarStyle {
    // Eşit çubuklar - her ikisi de aynı genişlikte
    const width = this.maxBarWidth * 0.4;

    if (isFirstHalf) {
      return {
        width: width,
        // Sarı çubuğun sağ tarafı yukarıdan aşağıya eğimli
        clipPath: `polygon(0 0, 100% 0, calc(100% - ${this.clipOffset}px) 100%, 0 100%)`
      };
    } else {
      return {
        width: width,
        // Kesişimin tam orta noktasından başlat, biraz daha sağa kaydır (boşluk oluşturur)
        left: width - (this.clipOffset * 0.7),
        // Üçüncü satırda siyah çubuğun sol tarafı sağdan sola eğimli, sağ tarafı düz
        clipPath: `polygon(0 100%, ${this.clipOffset}px 0, 100% 0, 100% 100%)`
      };
    }
  }

  // Satır indeksine göre uygun çubuk stillerini döndür
  getBarStyles(rowIndex: number, isFirstHalf: boolean): BarStyle {
    switch(rowIndex) {
      case 0: return this.getFirstRowBars(isFirstHalf);
      case 1: return this.getSecondRowBars(isFirstHalf);
      case 2: return this.getThirdRowBars(isFirstHalf);
      default: return { width: 0, clipPath: '', left: 0 };
    }
  }

  // Ondalık sayıları formatla (virgülle ayırarak)
  formatValue(value: number): string {
    return value.toString().replace('.', ',');
  }
}
