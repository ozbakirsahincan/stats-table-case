import { Injectable } from '@angular/core';
import { BarStyle } from '../interfaces';

/**
 * Satır tiplerine göre çubuk stil konfigürasyonları
 */
interface RowStyleConfig {
  firstHalf: {
    widthRatio: number;
  };
  secondHalf: {
    widthRatio: number;
    leftOffsetFactor: number;
    clipPathPattern: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BarStyleService {
  // Yapılandırma değerleri
  public readonly barContainerWidth = 500;
  public readonly maxBarWidth = this.barContainerWidth * 0.85;
  public readonly clipOffset = 15;

  // Satır tiplerine göre stil konfigürasyonları
  private readonly rowConfigs: RowStyleConfig[] = [
    // İlk satır için (Gesamtlaufdistanz in km)
    {
      firstHalf: { widthRatio: 0.45 },
      secondHalf: {
        widthRatio: 0.45,
        leftOffsetFactor: 0.7,
        clipPathPattern: `polygon(0 100%,
                                  $clipOffset 0,
                                  calc(100% - $clipOffset) 0,
                                  100% 45%,
                                  calc(100% - $clipOffset) 100%)`
      }
    },
    // İkinci satır için (Gesamtlaufdistanz Nettospielzeit in km)
    {
      firstHalf: { widthRatio: 0.15 },
      secondHalf: {
        widthRatio: 0.75,
        leftOffsetFactor: 0.5,
        clipPathPattern: `polygon(0 100%,
                                  $clipOffset 0,
                                  calc(100% - $clipOffset * 2) 0,
                                  100% 50%,
                                  calc(100% - $clipOffset * 2) 100%)`
      }
    },
    // Üçüncü satır için (Tempoläufe)
    {
      firstHalf: { widthRatio: 0.4 },
      secondHalf: {
        widthRatio: 0.4,
        leftOffsetFactor: 0.7,
        clipPathPattern: `polygon(0 100%,
                                  $clipOffset 0,
                                  100% 0,
                                  100% 100%)`
      }
    }
    // Buraya daha fazla satır tipi eklenebilir
  ];

  /**
   * Satır indeksine göre uygun çubuk stillerini döndürür
   */
  public getBarStyles(rowIndex: number, isFirstHalf: boolean): BarStyle {
    // Eğer satır konfigürasyonu mevcut değilse varsayılan değerleri kullan
    if (rowIndex >= this.rowConfigs.length) {
      // Yeni satırlar için varsayılan stil
      return this.getDefaultBarStyle(isFirstHalf);
    }

    const config = this.rowConfigs[rowIndex];
    return isFirstHalf
      ? this.generateFirstHalfStyle(config)
      : this.generateSecondHalfStyle(config);
  }

  /**
   * İlk yarı (sarı) çubuk stili oluşturur
   */
  private generateFirstHalfStyle(config: RowStyleConfig): BarStyle {
    const width = this.maxBarWidth * config.firstHalf.widthRatio;
    return {
      width,
      clipPath: this.getYellowClipPath()
    };
  }

  /**
   * İkinci yarı (siyah) çubuk stili oluşturur
   */
  private generateSecondHalfStyle(config: RowStyleConfig): BarStyle {
    const firstHalfWidth = this.maxBarWidth * config.firstHalf.widthRatio;
    const width = this.maxBarWidth * config.secondHalf.widthRatio;
    const left = firstHalfWidth - (this.clipOffset * config.secondHalf.leftOffsetFactor);

    // clipPathPattern'deki $clipOffset değerlerini gerçek değerlerle değiştir
    const clipPath = config.secondHalf.clipPathPattern.replace(/\$clipOffset/g, `${this.clipOffset}px`);

    return {
      width,
      left,
      clipPath
    };
  }

  /**
   * Yeni satırlar için varsayılan çubuk stili oluşturur
   */
  private getDefaultBarStyle(isFirstHalf: boolean): BarStyle {
    if (isFirstHalf) {
      return {
        width: this.maxBarWidth * 0.4,
        clipPath: this.getYellowClipPath()
      };
    } else {
      return {
        width: this.maxBarWidth * 0.4,
        left: this.maxBarWidth * 0.4 - (this.clipOffset * 0.7),
        clipPath: `polygon(0 100%, ${this.clipOffset}px 0, 100% 0, 100% 100%)`
      };
    }
  }

  /**
   * Sarı çubuklar için standart clip-path değerini döndürür
   */
  private getYellowClipPath(): string {
    return `polygon(0 0, 100% 0, calc(100% - ${this.clipOffset}px) 100%, 0 100%)`;
  }
}
