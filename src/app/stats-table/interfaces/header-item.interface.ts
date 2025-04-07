/**
 * Tablo başlık öğeleri için arayüz
 */
export interface HeaderItem {
  /** Başlık metni */
  label: string;

  /** Başlığın önündeki ikon (opsiyonel) */
  icon?: {
    type: 'square' | 'circle' | 'text' | 'emoji';
    content?: string;
    color?: string;
    textColor?: string;
  };

  /** Özel CSS sınıfları */
  classes?: string;

  /** Dikey çizgi gösterilecek mi? */
  showVerticalLine?: boolean;
}
