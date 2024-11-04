import { Tema } from './tema.model';
import { Docente } from './docente.model';
import { Alumno } from './alumno.model';

export class Curso {

    constructor(){
        this.id = 0;
        this.fechaInicio = new Date();
        this.fechaFin = new Date();
        this.precio = 0;
        this.docente = new Docente();
        this.alumnos= [];
        this.tema = new Tema();
    }

    id: number;
    fechaFin : Date;
    fechaInicio : Date;
    precio : number;
    docente: Docente;
    alumnos: Alumno[];
    tema: Tema;
}
