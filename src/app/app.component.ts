import { Component } from '@angular/core';
import { StatsTableComponent } from './stats-table/stats-table.component'; // <== bunu ekle

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StatsTableComponent], // <== bunu ekle
  templateUrl: './app.component.html',
})
export class AppComponent {}
