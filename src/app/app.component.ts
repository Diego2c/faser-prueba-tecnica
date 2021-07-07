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
		if(type == 'add'){
			for (const value of this.tareas) {
				if(value.id == id){
					value.favorito = true
				}
			}
		} else{
			for (const value of this.tareas) {
				if(value.id == id){
					value.favorito = false
				}
			}
		}
	}

	eliminarTarea(value) {
		this.tareas.forEach(function(item, index, object) {
			if (item === value) {
				object.splice(index, 1);
			}
		});
	}

	agregarTarea(){		
		this.tareas.push(new Tarea(this.tarea.id, this.tarea.titulo, this.tarea.minutos,false));
		this.tarea = { }
	}

	orderby(type){
		if(type == 'arrow_downward'){
			this.order = "-minutos";
		}else{
			this.order = 'minutos';
		}
	}

	
}
