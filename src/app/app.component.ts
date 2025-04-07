import { Component } from '@angular/core';
import { StatsTableComponent } from './stats-table/stats-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StatsTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'match-insights';
}
