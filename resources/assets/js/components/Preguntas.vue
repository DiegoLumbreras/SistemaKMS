<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                 preguntas Registradas
                          </h1>
                    <h4 class="card-title">preguntas</h4>
										<button  type="button" class="btn btn-warning btn-fw" @click="btnGuardar">Registrar preguntas</button>
                    <p class="card-description">Tabla de preguntas </p>
                     <form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                    <table class="table table-bordered">
                     
                      <thead>
                        <tr>
                        <th>Tipo de pregunta</th>
                          <th>Pregunta</th>
                          <th>Tema</th>
                          <th>Respuesta</th>
                          <th>Opciones(respuestas)</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
											<tr v-for="(pregunta, preg) in pregunta[0]" v-bind:key="pregunta.id">
                      <td class="text-left">{{pregunta.tipo}}</td>
												<td class="text-left">{{pregunta.pregunta}}</td>
                      	<td class="text-left">{{pregunta.tema}}</td>
                     		<td class="text-left">{{pregunta.respuesta}}</td>
                        <td><tr>A) {{pregunta.opcion}}</tr>
                        <tr>B) {{pregunta.opcion2}}</tr>
                        <tr>C) {{pregunta.opcion3}}</tr>
                        <tr>D) {{pregunta.opcion4}}</tr></td>
												<td class="text-right">
													<button class="btn btn-info" @click="btnEditar(pregunta.id_pregunta,pregunta.pregunta,pregunta.respuesta,pregunta.tipo,pregunta.opcion,pregunta.opcion2,pregunta.opcion3,pregunta.opcion4,pregunta.id_tema)">Editar</button>
													<button  class="btn btn-danger" @click="eliminar(pregunta.id_pregunta)">Eliminar</button>
												</td>
											</tr>
                      </tbody>
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
			pregunta: [],
			id: '',
			id_tema:'',
      opcion:'',
      opcion2:'',
      opcion3:'',
      opcion4:'',
      respuesta:'',
      pregunta:'',
      tipo:'',
      temasSeleccionado: {},
			temas: [],
			id: '',
			nombre_tema: '',
			nivel: '',
		}
	},
	mounted(){
		this.getpregunta(),
		this.getTemas()
	},
	methods: {
		getpregunta(){
			axios({method: 'GET', url: '/pregunta/show'}).then(
				result=> {
					console.log(result.data)
					this.pregunta = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    	getTemas(){///Funcion para mostrar los temas
			axios({method: 'GET', url: '/tema/all'}).then(
				result=> {
					console.log(result.data)
					this.temas = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
		
		guardarPregunta(pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema){///Funcion para guardar los temas
			axios.post('/pregunta/add',
			{pregunta:pregunta,respuesta:respuesta,tipo:tipo,opcion:opcion,opcion2:opcion2,opcion3:opcion3,opcion4:opcion4,id_tema:id_tema})
			.then((res)=>{
				
				this.opcion2=''
				this.tipo=''
        this.respuesta=''
        this.opcion=''
        this.pregunta=''
        this.id_tema=''
        this.opcion3=''
        this.opcion4=''
				this.getpregunta()
        
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					title: 'Registrar Pregunta',
					html:
						`<input id="pregunta" class="swal2-input" placeholder="pregunta">
						<input id="respuesta" class="swal2-input"  placeholder="respuesta">
            <input id="opcion" class="swal2-input"  placeholder="opcion">
            <input id="opcion2" class="swal2-input"  placeholder="opcion2">
            <input id="opcion3" class="swal2-input"  placeholder="opcion3">
            <input id="opcion4" class="swal2-input"  placeholder="opcion4">

						<br>
          <label for="id_tema_2">Elije a que tema es correspondiente:</label>
          <select id="id_tema" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="">Tema</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>
          	<br>
          <label for="tipo">Elije un tipo de pregunta:</label>

          <select id="tipo">
            <option value="opcion multiple">Opcion multiple</option>
            <option value="true o false">True o false</option>
            <option value="abierta">Abierta</option>
          </select>
          
          


         `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.pregunta=document.getElementById('pregunta').value,
							this.respuesta=document.getElementById('respuesta').value,
							this.tipo=document.getElementById('tipo').value,
							this.opcion=document.getElementById('opcion').value,
              this.opcion2=document.getElementById('opcion2').value,
              this.opcion3=document.getElementById('opcion3').value,
              this.opcion4=document.getElementById('opcion4').value,
							this.id_tema=document.getElementById('id_tema').value,
						]
					}})
					if(this.id_tema == "" ||this.pregunta == "" || this.respuesta == "" ||this.opcion == "" || this.opcion2 == "" || this.tipo== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarPregunta(this.pregunta,this.respuesta,this.tipo,this.opcion,this.opcion2,this.opcion3,this.opcion4,this.id_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Pregunta Registrada!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
    
    
    btnEditar:async function(id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema){
        const { value: formValues } = await this.$swal({
					title: 'Editar Pregunta',
					html:
						`<input id="pregunta" class="swal2-input" value="`+pregunta+`">
						<input id="respuesta" class="swal2-input" value="`+respuesta+`">
            <input id="opcion" class="swal2-input"  value="`+opcion+`">
            <input id="opcion2" class="swal2-input"  value="`+opcion2+`">
            <input id="opcion3" class="swal2-input"  value="`+opcion3+`">
            <input id="opcion4" class="swal2-input"  value="`+opcion4+`">

						<br>
          <label for="id_tema5">Elije a que tema es correspondiente:</label>
          <select id="id_tema" value="${
            this.temas
          }" name="temas" class="swal2-input">
            <option value="`+id_tema+`">Tema</option>
            ${this.temas[0].map(
              cat => `<option value="${cat.id}">${cat.nombre_tema}</option>`
            )}
          </select>
          	<br>
          <label for="tipo">Elije un tipo de pregunta:</label>

          <select id="tipo">
            <option value="opcion multiple">Opcion multiple</option>
            <option value="true o false">True o false</option>
            <option value="abierta">Abierta</option>
          </select>
          
          


         `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.pregunta=document.getElementById('pregunta').value,
							this.respuesta=document.getElementById('respuesta').value,
							this.tipo=document.getElementById('tipo').value,
							this.opcion=document.getElementById('opcion').value,
              this.opcion2=document.getElementById('opcion2').value,
              this.opcion3=document.getElementById('opcion3').value,
              this.opcion4=document.getElementById('opcion4').value,
							this.id_tema=document.getElementById('id_tema').value
						]
					}})
					if(this.id_tema == "" ||this.pregunta == "" || this.respuesta == "" ||this.opcion == "" || this.opcion2 == "" || this.tipo== ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editar(id,this.pregunta,this.respuesta,this.tipo,this.opcion,this.opcion2,this.opcion3,this.opcion4,this.id_tema);//funcion guardarTema
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Pregunta Editada!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
    },
    
    
    
    editar(id,pregunta,respuesta,tipo,opcion,opcion2,opcion3,opcion4,id_tema){
  	axios.post('/pregunta/update',
			{id:id,pregunta:pregunta,respuesta:respuesta,tipo:tipo,opcion:opcion,opcion2:opcion2,opcion3:opcion3,opcion4:opcion4,id_tema:id_tema})
			.then((res)=>{
			
        this.id = ''
      	this.opcion2=''
				this.tipo=''
        this.respuesta=''
        this.opcion=''
        this.pregunta=''
        this.id_tema=''
        this.opcion3=''
        this.opcion4=''
			
				this.getpregunta()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    eliminar(id){  
      axios.post('/admins/app/pregunta/delete',{id:id}).then((res)=>{
		
        this.id = ''
				this.getpregunta()
				console.log(res)
        const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Pregunta Eliminada!'
						})
			})
				.catch((err)=>{
					console.log(err)
			    	this.$swal({
								type: 'info',
								title: 'Error al eliminar',
							})
				})
    
    }    
	}
}
</script>