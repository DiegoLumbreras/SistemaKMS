

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')}*/

const Route = use('Route')
const User = use('App/Models/User')
//const Tema = use('App/Models/Tema')
//ruta dashboard

//RUTAS DEL ARBOL
Route.get('/temas/posiblesNodosPadres/:id', 'TemaController.posiblesNodosPadres')
Route.get('/temas/obtenerPadres/:id', 'TemaController.obtenerPadres')
Route.get('/temas/obtenerPadresConNombre/:id', 'TemaController.obtenerPadresConNombre')
Route.get('/tema/relacionesPrimarias','TemaController.verrelacion')
Route.post('tema/addTema','TemaController.registrar');
Route.post('tema/actualizarColor','TemaController.actualizarColor')
Route.get('/tema/obtenerRadio','TemaController.obtenerRadio')
Route.post('tema/actualizarRadio/:radio', 'TemaController.actualizarRadio')
Route.get('/user/obtenerAlumnos','TemaController.obtenerAlumnos')
Route.get('/user/obtenerArbol/:id','TemaController.obtenerArbol')
Route.get('/obtenerConexiones/:id','TemaController.obtenerConexiones')

// FIN DE RUTAS DEL ARBOL

Route.get('/profesor/count','UserController.profesorcount')
Route.get('/alumno/count','UserController.alumnocount')
Route.get('/admin/count','UserController.adminscount')
Route.get('/experto/count','UserController.expertocount')
Route.get('/pregunta/count','PreguntaController.preguntacount')
Route.get('/temas/count','TemaController.temacount')
//rutas generales.
Route.get('/preguntas/nodo','PreguntaController.preguntanodo')
Route.get('/arbol',({view})=> view.render('arbol'))
Route.get('/',({view})=> view.render('login'))
Route.post('login','UserController.login')
Route.get('logout','UserController.logout')
//Route.get('/app',({view})=> view.render('app'))

Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')
Route.post('tema/cambiarPadre/:id','TemaController.cambiarPadre')
Route.post('tema/hacerHijoPadre/:id','TemaController.hacerHijoPadre')

Route.post('tema/editarNodo/:id','TemaController.editarNodo')
Route.get('temas/arbol','TemaController.arbol')
Route.get('temas/arbol2','TemaController.arbol2')
Route.get('temas/:id','TemaController.show')
Route.get('id/info','UserController.info')
//rutas preguntas
Route.post('tema/posicion','TemaController.posicion')
Route.get('pregunta/show','PreguntaController.showall')
Route.post('pregunta/update','PreguntaController.update')
Route.post('pregunta/add','PreguntaController.store')
Route.post('pregunta/delete','PreguntaController.delete')
Route.get('temas', async () => {return await Tema.all()})
Route.get('tema/all','TemaController.showOnlyTemas')


// obtener arbol usuario
Route.get('tema/arbolu','TemaController.showausuario')
// agregar padre secundario
Route.post('tema/addsecundario','TemaController.registrar_secundario')
Route.post('tema/deleteNodoSecundario','TemaController.deleteNodoSecundarioRelation')
Route.post('tema/deleteTema1/:id','TemaController.deleteTemaAndHijos')


Route.post('alumno/add','UserController.realumno')
Route.get('alumno/show','UserController.alumnos')
Route.post('user/delete','UserController.delete')
Route.post('user/delete2','UserController.deletealumno')
Route.post('user/delete3','UserController.deleteprofesor')
Route.post('user/actualizar','UserController.actualizar')
Route.post('app/alumno/actualizar','UserController.actualizarA')
Route.get('alumno/showp','UserController.alumnosP')
Route.get('admin/show','UserController.admins')
Route.get('admin/show/profesor','UserController.profesor')
Route.get('admin/show/experto','UserController.experto')
//rutas del administrador
Route.group(()=>{
		Route.any('app', ({view}) =>  view.render('app'))
		Route.get('app/admin', ({view}) =>  view.render('app'))
    Route.get('app/alumno', ({view}) =>  view.render('app'))
    Route.get('app/experto', ({view}) =>  view.render('app'))
   Route.get('app/arbol', ({view}) =>  view.render('app'))
   Route.get('app/profesores', ({view}) =>  view.render('app'))
   Route.get('app/nodos', ({view}) =>  view.render('app'))
   Route.get('app/historial', ({view}) =>  view.render('app'))
   Route.get('app/preguntas', ({view}) =>  view.render('app'))
   Route.get('app/preguntas/contestar', ({view}) =>  view.render('app'))
  Route.get('app/preguntas/nodo', ({view}) =>  view.render('app'))
   Route.post('tema/addTema','TemaController.registrar')	
Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')
Route.get('tema/editarNodo/:id:id2:nombre','TemaController.editarNodo')
Route.get('temas/arbol','TemaController.arbol')
Route.get('temas/arbol2','TemaController.arbol2')
Route.get('temas/:id','TemaController.show')
Route.get('app/temas',({view})=> view.render('app'))
//rutas preguntas

Route.get('app/pregunta/show','PreguntaController.showall')
Route.post('app/pregunta/update','PreguntaController.update')
Route.post('app/pregunta/add','PreguntaController.store')
Route.post('app/pregunta/delete','PreguntaController.delete')
Route.get('temas', async () => {return await Tema.all()})
Route.get('tema/all','TemaController.showall')
Route.get('tema/hijos/:id','TemaController.showTemasHijos')
// obtener arbol usuario
Route.get('tema/arbolu','TemaController.showausuario')
// agregar padre secundario
Route.post('tema/addsecundario','TemaController.registrar_secundario')
Route.post('tema/deleteNodoSecundario','TemaController.deleteNodoSecundarioRelation')

Route.post('app/alumno/add','UserController.realumno')
Route.get('app/alumno/show','UserController.alumnos')
Route.post('app/user/delete','UserController.delete')
Route.post('app/user/actualizar','UserController.actualizar')
Route.post('app/alumno/actualizar','UserController.actualizarA')
Route.get('alumno/showp','UserController.alumnosP')
Route.get('app/admin/show','UserController.admins')
Route.get('app/show/profesor','UserController.profesor')
Route.get('app/show/experto','UserController.experto')
Route.post('app/registrar','UserController.registrar')
Route.post('app/user/delete2','UserController.deletealumno')
Route.post('app/user/delete3','UserController.deleteprofesor')
  
Route.get('app/resolvercuestionario',({view}) => view.render('app'))
}).prefix('admins').middleware(['auth'])
//rutas del experto
Route.group(()=>{
  	Route.any('app', ({view}) =>  view.render('experto'))
 
    Route.get('app/nodos',({view}) => view.render('experto'))
    Route.get('app/informacionpersonal',({view}) => view.render('experto'))
    Route.get('app/preguntas',({view}) => view.render('experto'))
  // agregar padre secundario
  Route.post('tema/addsecundario','TemaController.registrar_secundario')
  // ruta de agregar tema
  Route.post('tema/addTema','TemaController.registrar')	
	// EliminarTemayTodosSusHijos
	Route.post('prueba','TemaController.agregarTema')	
	Route.get('tema/deleteTema1/:id','TemaController.deleteTemaAndHijos')
	Route.post('tema/deleteandcambiarPadre/:id','TemaController.deleteandcambiarPadre')//CCambiar padre y eliminar nodo
  Route.post('tema/editarNodo','TemaController.editarNodo')//Se eidta el nodo y se puede cambiar el padre
	Route.get('tema/relacionesPrimarias','TemaController.verrelacion')	///Obtener relaciones primarias
}).prefix('experto').middleware(['auth'])
//rutas del profesor
Route.group(()=>{
  	Route.any('app', ({view}) =>  view.render('profesor'))
    

    Route.get('/app/historialalumnosprofesor',({view})=>view.render('profesor'))
    Route.get('app/arbolalumno',({view}) => view.render('profesor'))
    Route.get('app/informacionpersonal',({view}) => view.render('profesor'))
    Route.get('app/resolvercuestionario',({view}) => view.render('profesor'))
    Route.get('app/historialalumnos',({view}) => view.render('profesor'))
}).prefix('profesor').middleware(['auth'])
//rutas del alumno
Route.group(()=>{
  
  	Route.any('app', ({view}) =>  view.render('alumno'))
  
    Route.get('app/',({view}) => view.render('alumno'))
    Route.get('app/arbolalumno',({view}) => view.render('alumno'))
    Route.get('app/informacionpersonal',({view}) => view.render('alumno'))
    Route.get('app/resolvercuestionario',({view}) => view.render('alumno'))
    Route.get('app/historialalumnos',({view}) => view.render('alumno'))
  
}).prefix('alumno').middleware(['auth'])