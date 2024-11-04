import {Curso} from './curso.model';

export class Alumno {

    constructor(){
        this.id = 0;
        this.nombre = '';
        this.fechaNacimiento = new Date();
        //this.cursos = [];

    }

    id? : number;
    nombre: string;
    fechaNacimiento: Date;
    //cursos: Curso[];

}


