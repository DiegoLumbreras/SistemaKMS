<template>

             <div class="row">
                <div class="col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-lg-3 col-md-6">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{alumnos.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/alumno">alumnos</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                      
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{profesor.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/profesores">Profesores</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                       
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{experto.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/expertos">expertos</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                        
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{admins.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/admin">admins</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <center>
   <div class="row">
                       <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{temas.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/arbol">Temas</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                         
                        </div>
                      </div>
                       <div class="col-lg-3 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{pregunta.total}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary"><i class="fa fa-pencil"></i><a href="/admins/app/preguntas">Preguntas</a></h5>
                            <p class="mb-0 text-muted"></p>
                          </div>
                         
                        </div>
                      </div>
                    </div>
  
  </center>
                   
                  </div>
                </div>
              </div>
        
  </div>

</template>

<script>
import axios from 'axios'

export default{
	data(){
		return {
			pregunta:'',
      experto:'',
      profesor:'',
      alumnos:'',
      temas:'',
      admins:''
		}
	},
	mounted(){
		this.getpregunta(),
		this.getTemas(),
      this.getadmins(),
      this.getprofesor(),
      this.getalumnos(),
      this.getexperto()
	},
	methods: {
		getpregunta(){
			axios({method: 'GET', url: '/pregunta/count'}).then(
				result=> {
					console.log(result.data)
					this.pregunta = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    		getTemas(){
			axios({method: 'GET', url: '/temas/count'}).then(
				result=> {
					console.log(result.data)
					this.temas = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getadmins(){
			axios({method: 'GET', url: '/admin/count'}).then(
				result=> {
					console.log(result.data)
					this.admins = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getalumnos(){
			axios({method: 'GET', url: '/alumno/count'}).then(
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
			axios({method: 'GET', url: '/profesor/count'}).then(
				result=> {
					console.log(result.data)
					this.profesor = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}, 
    getexperto(){
			axios({method: 'GET', url: '/experto/count'}).then(
				result=> {
					console.log(result.data)
					this.experto = result.data
				},
				error=> {
					console.error(error)
				}
			)
		}, 
	}
}
</script>