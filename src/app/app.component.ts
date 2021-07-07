import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	tarea : Tarea = { }
	order = 'minutos'
	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	favorito(type : string, id : number){
		console.log(type, id);
		if(type == 'add'){
			this.tareas[id].favorito = true
		} else{
			this.tareas[id].favorito = false
		}
	}

	eliminarTarea(id : number) {
		this.tareas.splice(id,1);		
	}

	agregarTarea(){		
		this.tareas.push(this.tarea)
		this.tarea.id = 0;
		this.tarea.titulo= '';
		this.tarea.minutos = 0;
	}

	orderby(type){
		if(type == 'arrow_downward'){
			this.order = "-minutos";
		}else{
			this.order = 'minutos';
		}
		
	}

	
}
