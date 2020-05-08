<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                 Alumnos Registrados a tu cargo
                          </h1>
                    <h4 class="card-title">Alumnos</h4>
									
                    <p class="card-description">Tabla de tus Alumnos </p>
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
                          <th>Tipo Usuario</th>
               
                      
                        </tr>
                      </thead>
                      <tbody>
											<tr v-for="(alumnos) in alumnos" v-bind:key="alumnos.id">
												<td class="text-left">{{alumnos.nombre_alumno}}</td>
                        <td class="text-left">{{alumnos.apellido_alumno}}</td>
                        <td class="text-left">{{alumnos.matricula}}</td>  
                        <td class="text-left">Alumno</td>
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
	},
	methods: {
		getAlumnos(){
			axios({method: 'GET', url: 'alumno/showp'}).then(
				result=> {
					console.log(result.data)
					this.alumnos = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}
	}
}
</script>