<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                   Temas Registrados
                          </h1>
                    <h4 class="card-title">Temas</h4>
										<button @click="btnGuardar" class="btn btn-warning btn-fw">Registrar Tema</button>
                    <p class="card-description">Tabla de Temas </p>
                     <form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                    <table class="table table-bordered">
											<tr v-for="(temas, tema) in temas[0]" v-bind:key="temas.id" v-bind:nombre_tema="temas.nombre_tema">
												<td calss="text-left">{{temas.nombre_tema}}</td>
                        <td calss="text-left">{{temas.nivel}}</td>
												<td calss="text-left">{{temas.padre}}</td>
												<td calss="text-left">{{temas.id_padre}}</td>
												<td class="text-right">
												
													<button v-on:click="btnEditar(temas.id,temas.nombre_tema,temas.padre,temas.id_padre)" class="btn btn-info">Editar</button>
													
												
															<button id="btnGroupDrop1"  type="button" class="btn btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																Eliminar
															</button>
															<div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
																<a class="dropdown-item" v-on:click="btnEliminarTemaAndHijos(temas.id)" href="#">Eliminar todos</a>
																<a class="dropdown-item" v-on:click="btnAbueloAPadre(temas.id,temas.id_padre)" href="#">Hacer padre al abuelo</a>
																
															</div>																										
												</td>
											</tr>
                    </table>
                  </div>
                </div>
              </div>
              
              </div>
  </div>
  </center>
        
    </div>
</template>

<script>
import axios from 'axios'


export default{	
	data(){
		return {
			temasSeleccionado: {},
			temas: [],
			temas_hijos: [],
			id: '',
			nombre_tema: '',
			padre: '',
			nivel: '',
			id_padre: '',
      freey:'',
      freex:''
		}
	},
	mounted(){
		this.getTemas()
	},
	methods: {
		hacerPadreAlAbuelo(oldParent, newChildParent){///Eliminar tema y Hacer padre al abuelo
			
			axios({method: 'POST', url: "/tema/deleteandcambiarPadre/"  + oldParent + "?id=" + oldParent + "&id2=" + newChildParent}).then(
				result=> {
					console.log(result.data)
					this.getTemas()
					
				},
				error=> {
					console.error(error)
				}
			)			
		},
		deleteTemaAndHijos(id){///Funcion para eliminar tema y hijos
			axios({method: 'POST', url: '/tema/deleteTema1/'+ id + '?id='+id}).then(
				result=> {
					console.log(result.data)
					this.getTemas()
					
				},
				error=> {
					console.error(error)
				}
			)
		},	
		getTemas(){///Funcion para mostrar los temas
			axios({method: 'GET', url: '/admins/tema/all'}).then(
				result=> {
					console.log(result.data)
					this.temas = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
		getTemasHijos(id){///Funcion para mostrar los temas
		  var i;
				for(var temas in this.temas[0]){
					if(this.temas[0][temas].id_padre==id){
						this.temas_hijos.push(this.temas[0][temas]);
					}					
					//console.log(this.temas[0][temas].nombre_tema);
				}
				console.log("Despues de obtener los padres");
				for(var temas in this.temas_hijos){
					console.log(this.temas_hijos[temas].nombre_tema);
				}
				
			
		},		
		guardarTema(nombre_tema,padre,textPosition){///Funcion para guardar los temas
			axios.post('/experto/tema/addTema',
			{nombre_tema: nombre_tema,id_padre:padre,textPosition:textPosition})
			.then((res)=>{
				this.padre=''
				this.getTemas()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		
		
		editarTema(id_tema,id_padre,nombre_tema){///Funcion para editar los temas
			axios.post('/experto/tema/editarNodo',
			{id_nodo:id_tema, id_padre:id_padre,nombre_nodo:nombre_tema})
			.then((res)=>{
				this.padre=''
				this.nivel_tema=''
				this.getTemas()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},	
		btnEliminarTemaAndHijos: async function(id){
			this.deleteTemaAndHijos(id);
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					title: 'Registrar Tema',
					html:
						`<input id="nombre_tema" class="swal2-input" placeholder="Nombre">
						<br>
          <select id="padre" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="">Padre</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.nombre_tema=document.getElementById('nombre_tema').value,
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.nombre_tema== "" ){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarTema(this.nombre_tema,this.padre,0);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
		btnEditar: async function(id,nombre,padre,id_padre){
				const { value: formValues } = await this.$swal({
					title: 'Actualizar Tema',
					html:
						`<input id="nombre_tema" class="swal2-input" value="`+nombre+`">
						<br>
          <select id="padre" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="`+id_padre+`">`+padre+`</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.nombre_tema=document.getElementById('nombre_tema').value,
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.nombre_tema== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editarTema(id,this.padre,this.nombre_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Actualizado!'
						})
					}
				
				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
		btnAbueloAPadre: async function(id,id_padre){
					
					this.$swal.fire({
						title: '¿Esta Seguro que quiere eliminar este Tema?',
						text: "Se asignara el tema padre de este tema a padre de los hijos",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Aceptar',
						cancelButtonText: 'Cancelar'
					}).then((result) => {
						console.log(result);
						if (result) {
							this.hacerPadreAlAbuelo(id,id_padre);
							this.$swal.fire(
								'Eliminado!',
								'El tema ha sido Eliminado.',
								'success'
							)
						}
					})					
		},
		btnVolverHijoPadre: async function(id,id_padre){
				this.getTemasHijos(id);
				const { value: formValues } = await this.$swal({
					title: 'Seleccione Nuevo Padre',
					html:
          `<select id="padre" value="${
            this.temas_hijos
          }" name="temas" class="swal2-input">
            ${this.temas_hijos.map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.padre=document.getElementById('padre').value
						]
					}})
					if(this.padre== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						//this.HijoAPadre(id_padre,this.padre);//funcion cambiar hijo a padre
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Tema Actualizado!'
						})
					}
					var tam= this.temas_hijos.length;
					this.temas_hijos.splice(0,tam);
		}
		
		//Fin metodos
		}
}

</script>