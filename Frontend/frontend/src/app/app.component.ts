import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, AlumnoListComponent, CursoListComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  routes: Array<any> = routes;
  
}