import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItem, RowData } from './interfaces';
import { TABLE_HEADERS } from './data/headers.data';
import { TABLE_ROWS } from './data/rows.data';
import { BarStyleService } from './services/bar-style.service';
import { FormatterService } from './services/formatter.service';

@Component({
  selector: 'app-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.css']
})
export class StatsTableComponent {
  // Veri modelleri
  public headers = signal<HeaderItem[]>(TABLE_HEADERS);
  public rows = signal<RowData[]>(TABLE_ROWS);

  constructor(
    private barStyleService: BarStyleService,
    private formatterService: FormatterService
  ) {}

  /**
   * Çubuk stillerini hesaplar
   */
  public getBarStyles(rowIndex: number, isFirstHalf: boolean) {
    return this.barStyleService.getBarStyles(rowIndex, isFirstHalf);
  }

  /**
   * Değerleri formatlar
   */
  public formatValue(value: number): string {
    return this.formatterService.formatValue(value);
  }
}
