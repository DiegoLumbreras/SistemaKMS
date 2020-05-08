<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                Preguntas registradas por nodo.
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
		}
    
    
    
    }    
	}
</script>