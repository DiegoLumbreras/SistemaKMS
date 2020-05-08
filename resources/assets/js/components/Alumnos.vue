<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                 Alumnos Registrados
                          </h1>
                    <h4 class="card-title">Alumnos</h4>
										<button  type="button" class="btn btn-warning btn-fw" @click="btnGuardar">Registrar Alumno</button>
                    <p class="card-description">Tabla de Alumnos </p>
                     <form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                    <table class="table table-bordered">
                     <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Matricula</th>
                          <th>Nivel Academico</th>
                          <th>Tipo Usuario</th>
                          <th>Profesor</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
					 					<tr v-for="(alumnos, alumno) in alumnos[0]" v-bind:key="alumnos.id_alumnos" v-bind:nombre="alumnos.nombre_alumno">
												<td class="text-left">{{alumnos.nombre_alumno}}</td>
                        <td class="text-left">{{alumnos.apellido_paterno}}<tr>{{alumnos.apellido_materno}}</tr></td>
                    
                        <td class="text-left">{{alumnos.matricula}}</td>
                        <td class="text-left">{{alumnos.nivel_academico}}</td>  
                        <td class="text-left">Alumno</td>
                        <td class="text-left">{{alumnos.id_profesor}}</td>
               
												<td class="text-right">
													<button  class="btn btn-info" @click="btnEditar(alumnos.id_alumnos,alumnos.nombre_alumno,alumnos.apellido_paterno,alumnos.apellido_materno,alumnos.matricula,alumnos.nivel_academico,alumnos.id_profesor)">Editar</button>
													<button  class="btn btn-danger" @click="eliminar(alumnos.id_alumnos)">Eliminar</button>
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
			alumnos: [],
			id: '',
			nombre_alumno: '',
			apellido_paterno:'',
			apellido_materno:'',
			apellidos:'',
			nivel_academico:'',
			id_profesor:'',
			matricula:'',
			password:'',
			id_rol: ''
		}
		
	},
	
	mounted(){
		this.getAlumnos()
		this.getprofesor()
	},
	methods: {
		getAlumnos(){
			axios({method: 'GET', url: '/alumno/show'}).then(
				result=> {
					console.log(result.data)
					this.alumnos = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    getprofesor(){
			axios({method: 'GET', url: '/admin/show/profesor'}).then(
				result=> {
					console.log(result.data)
					this.profesor = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    



    
    guardarAlumno(nombre,apellido_paterno,apellido_materno,matricula,password,nivel_academico,id_profesor,id_rol){///Funcion para guardar los usuarios
			axios.post('/alumno/add',
			{nombre: nombre,
			apellido_paterno:apellido_paterno, 
			apellido_materno:apellido_materno,
			matricula:matricula,
			password:password,
			nivel_academico:nivel_academico,
			id_profesor:id_profesor,
			id_rol:id_rol})
			.then((res)=>{
				this.nombre=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id_profesor=''
        this.id_rol = ''
        this.nivel_academico=''
				this.getAlumnos()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					title: 'Registrar Alumno',
					html:
						`<input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="apellido_paterno" class="swal2-input" placeholder="Apellido Paterno">
            <input id="apellido_materno" class="swal2-input" placeholder="Apellido Materno">
            <input id="matricula" class="swal2-input" placeholder="Matricula">
            <input id="password" class="swal2-input" placeholder="Contraseña">
            <input id="nivel_academico" class="swal2-input" placeholder="Nivel academico">
						<br> 
          <label for="id_profesor">Elije un profesor:</label>
          <select id="id_profesor" value="${
            this.profesor
          }" name="profesor" class="swal2-input">
            <option value="">Profesor</option>
            ${this.profesor.map(
              cat => `<option value="${cat.id}">${cat.nombre}</option>`
            )}
          </select>
            `,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.nombre=document.getElementById('nombre').value,
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.matricula=document.getElementById('matricula').value,
							this.password=document.getElementById('password').value,
							this.nivel_academico = document.getElementById('nivel_academico').value, 
							this.id_profesor = document.getElementById('id_profesor').value
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == "" || this.id_profesor == "" || this.nivel_academico == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarAlumno(this.nombre,this.apellido_paterno,this.apellido_materno,this.matricula,this.password,this.nivel_academico,this.id_profesor,4);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Alumno Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
     btnEditar:async function(id,nombre_alumno,apellido_paterno,apellido_materno,matricula,nivel_academico,idProfesor){
         	const { value: formValues } = await this.$swal({
					title: 'Editar Alumno',
					html:
						`<input id="nombre" class="swal2-input" placeholder="Nombre" value="`+nombre_alumno+`">
						<input id="apellido_paterno" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
						<input id="apellido_materno" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
						<input id="matricula" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
						<input id="password" class="swal2-input" placeholder="Contraseña" value="secret">
						<input id="nivel_academico" class="swal2-input" placeholder="Nivel academico" value="`+nivel_academico+`" >
						<br> 
						<label for="id_profesor3">Elije un profesor:</label>
						<select id="id_profesor" value="${
							this.profesor
						}" name="profesor" class="swal2-input">
							<option value="`+idProfesor+`">Profesor</option>
							${this.profesor.map(
							cat => `<option value="${cat.id}">${cat.nombre}</option>`
							)}
						</select>
							`,
					focusConfirm: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					confirmButtonColor: '#1cc88a',
					cancelButttonColor: '#3085d6',
					preConfirm: () => {
						return [
							this.apellido_paterno=document.getElementById('apellido_paterno').value,
							this.apellido_materno=document.getElementById('apellido_materno').value,
							this.nombre=document.getElementById('nombre').value,
							this.matricula=document.getElementById('matricula').value,
							this.password=document.getElementById('password').value,
							this.nivel_academico = document.getElementById('nivel_academico').value, 
							this.id_profesor = document.getElementById('id_profesor').value,
							this.id=id
             
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == "" || this.id_profesor == "" || this.nivel_academico == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editar(this.id,this.nombre,this.apellido_paterno,this.apellido_materno,this.password,this.matricula,this.nivel_academico,this.id_profesor);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Alumno editado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}		
    },
    
    
    
    editar(id,nombre,apellido_paterno,apellido_materno,password,matricula,nivel_academico,id_profesor){
  	axios.post('/app/alumno/actualizar',
			{id:id,nombre:nombre,apellido_paterno:apellido_paterno,apellido_materno:apellido_materno,password:password,matricula:matricula,nivel_academico:nivel_academico,id_profesor:id_profesor})
			.then((res)=>{
				this.nombre=''
		    this.nivel_academico = ''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
        this.id_profesor = ''
      
				this.getAlumnos()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    eliminar(id){  
      axios.post('user/delete2',{id:id}).then((res)=>{
	
        this.id = ''
				this.getAlumnos()
				console.log(res)
        const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Alumno Eliminado!'
						})
			})
				.catch((err)=>{
					console.log(err)
			   
				})
    
    }
    
    
    
    
    
    
	}
}
</script>