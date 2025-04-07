import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  /**
   * Ondalık sayıları Alman formatına uygun olarak virgülle ayırarak formatlar
   */
  public formatValue(value: number): string {
    return value.toString().replace('.', ',');
  }
}
