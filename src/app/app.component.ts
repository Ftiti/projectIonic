import { Component } from '@angular/core';
import { FileSystemService } from './widgets/file-system/file-system.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(fileSystem:FileSystemService) {}
}
