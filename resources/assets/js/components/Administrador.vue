<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                 Admin Registrados
                          </h1>
                    <h4 class="card-title">Admin</h4>
										<button  type="button" class="btn btn-warning btn-fw"  @click="btnGuardar">Registrar Admin</button>
                    <p class="card-description">Tabla de Aadmin </p>
                     <form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                    <table class="table table-bordered">
                     <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                          <th>Matricula</th>
                          <th>Tipo Usuario</th>
               
                        
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
											<tr v-for="(admin) in admin" v-bind:key="admin.id">
												<td class="text-left">{{admin.nombre}}</td>
                        <td class="text-left">{{admin.apellido_paterno}}</td>
                         <td class="text-left">{{admin.apellido_materno}}</td>
                        <td class="text-left">{{admin.matricula}}</td>  
                        <td class="text-left">Admin</td>
                     
               
												<td class="text-right">
													<button class="btn btn-info"  @click="btnEditar(admin.id,admin.nombre,admin.apellido_materno,admin.apellido_paterno,admin.matricula)">Editar</button>
													<button  class="btn btn-danger" @click="eliminar(admin.id)">Eliminar</button>
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
			admin: [],
			id: '',
			nombre: '',
      apellido_paterno:'',
      apellido_materno:'',
      apellidos:'',
      matricula:'',
      password:'',
      id_rol: ''
		}
	},
	mounted(){
		this.getAdmin()
	},
	methods: {
		getAdmin(){
			axios({method: 'GET', url: 'admin/show'}).then(
				result=> {
					console.log(result.data)
					this.admin = result.data
				},
				error=> {
					console.error(error)
				}
			)
		},
    
    guardarAdmin(nombre,apellido_materno,apellido_paterno,matricula,password){///Funcion para guardar los usuarios
			axios.post('registrar',
			{nombre: nombre, nivel_academico:"",id_rol:1,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
				this.apellido_materno=''
				this.apellido_paterno=''
				this.matricula=''
				this.password=''
				this.getAdmin()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
		},
		btnGuardar: async function(){
				const { value: formValues } = await this.$swal({
					title: 'Registrar Admin',
					html:
						`<input id="nombre" class="swal2-input" placeholder="Nombre">
            <input id="apellido_paterno" class="swal2-input" placeholder="Apellido Paterno">
            <input id="apellido_materno" class="swal2-input" placeholder="Apellido Materno">
            <input id="matricula" class="swal2-input" placeholder="Matricula">
            <input id="password" class="swal2-input" placeholder="Contraseña">
						<br> 
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
              this.password=document.getElementById('password').value
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.guardarAdmin(this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Admin Registrado!'
						})
					}
				

				//if (formValues) {
					//this.$swal(JSON.stringify(formValues))
				//}			
		},
    
    
    btnEditar:async function(id,nombre,apellido_paterno,apellido_materno,matricula){
          const { value: formValues } = await this.$swal({
					title: 'Registrar Admin',
					html:
						`<input id="nombre" class="swal2-input" placeholder="Nombre" value="`+nombre+`">
            <input id="apellido_paterno" class="swal2-input" placeholder="Apellido Paterno" value="`+apellido_paterno+`">
            <input id="apellido_materno" class="swal2-input" placeholder="Apellido Materno" value="`+apellido_materno+`">
            <input id="matricula" class="swal2-input" placeholder="Matricula" value="`+matricula+`">
            <input id="password" class="swal2-input" placeholder="Contraseña" value="secret">
						<br> 
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
              this.id = id
						]
					}})
					if(this.nombre== "" || this.apellido_materno == "" || this.apellido_paterno == "" || this.password == "" || this.matricula == ""){
							this.$swal({
								type: 'info',
								title: 'Datos incompletos',
							})
					}
					else{
						this.editar(this.id,this.nombre,this.apellido_materno,this.apellido_paterno,this.matricula,this.password);//funcion guardarAdmin
						const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Admin Editado!'
						})
    }
    },
    
    
    
    editar(id,nombre,apellido_materno,apellido_paterno,matricula,password){
  	axios.post('user/actualizar',
			{id:id,nombre: nombre, nivel_academico:"",id_rol:1,apellido_materno:apellido_materno,apellido_paterno:apellido_paterno,password:password,matricula:matricula})
			.then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
				this.getAdmin()
				console.log(res)
			})
				.catch((err)=>{
					console.log(err)
				})
    },
      
      
      
    eliminar(id){  
      axios.post('user/delete',{id:id}).then((res)=>{
				this.nombre=''
				this.id_rol=''
        this.apellido_materno=''
        this.apellido_paterno=''
        this.matricula=''
        this.password=''
        this.id = ''
				this.getAdmin()
				console.log(res)
        const Toast = this.$swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});
						this.$swal.fire({
							type: 'success',
							title: '¡Admin Eliminado!'
						})
			})
				.catch((err)=>{
					console.log(err)
			    
				})
    
    }
    
    
    
    
    
	}
}
</script>