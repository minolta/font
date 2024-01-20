import { Component } from '@angular/core';
import { WService } from './w.service';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'font';
  env = environment
  constructor(public ws: WService) {}
}
