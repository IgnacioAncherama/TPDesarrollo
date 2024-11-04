import { Routes } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { DocenteListComponent } from './components/docente-list/docente-list.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { AlumnoAddComponent } from './components/alumno-add/alumno-add.component';
import { TemaAddComponent } from './components/tema-add/tema-add.component';
import { DocenteAddComponent } from './components/docente-add/docente-add.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { HomeComponent } from './components/home/home.component';
import { CursoFechaComponent } from './components/curso-fecha/curso-fecha.component';
import {  CVigentesComponent } from './components/CVigentes-list/CVigentes-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path: 'home', component: HomeComponent },
    { path: 'alumnos', component: AlumnoListComponent },
    { path: 'alumno-create', component: AlumnoAddComponent },
    { path: 'cursos', component: CursoListComponent },
    { path: 'docentes', component: DocenteListComponent },
    { path: 'temas', component: TemaListComponent },
    { path: 'tema-create', component: TemaAddComponent },
    { path: 'docente-create', component: DocenteAddComponent},
    { path: 'cursos-create', component: CursoAddComponent},
    { path: 'curso-fecha-fin', component: CursoFechaComponent},
    { path: 'docente-ver-alumnos', component: CVigentesComponent}

  ];