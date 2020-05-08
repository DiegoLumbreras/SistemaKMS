<template>
    <div>
    <center>
      
      <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h1>
                      Nodos
                          </h1>
                    <h4 class="card-title">Nodos</h4>
                    <p class="card-description">Tabla de los nodos</p>
                    <form class="ml-auto search-form d-none d-md-block" action="#">
                      <div class="form-group">
                        <input type="search" class="form-control" placeholder="Buscar">
                      </div>
                    </form>
                   <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Nombre tema</th>
                          <th>Nivel</th>
                          <th>Padre</th>
                          <th>Hijo</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                      <td>Algebra</td>
                      <td>2</td>
                      <td>Matematicas</td>
                      <td>Algebra Lineal</td>
            
                       <td>
                      <tr>
                      <button type="button" class="btn btn-danger btn-fw">Eliminar</button>
                      </tr>
                      <tr>
                          <button type="button" class="btn btn-warning btn-fw">Editar</button>
                      </tr>
                      </td>
                        
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
export default {
    name: 'Nodos',
}
</script>