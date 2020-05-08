// resources/assets/js/router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Profesores from '@/components/Profesores'
import Preguntas from '@/components/Preguntas'
import Nodos from '@/components/Nodos'
import Halumno from '@/components/Halumno'
import Expertos from '@/components/Expertos'
import Alumnos from '@/components/Alumnos'
import Administrador from '@/components/Administrador'

//modulos extras que permiten resolver problemas
import Informacion from '@/components/informacionpersonal'
import resolvercuestionario from '@/components/resolvercuestionario'
import historialalumnosprofesor from '@/components/historialalumnosprofesor'
import arbolalumno from '@/components/arbolalumno'
import historialalumnos from '@/components/historialalumnos'
import expertop from '@/components/expertop'
import temas from '@/components/temas'
Vue.use(Router)

export default new Router({
    mode: 'history', // use HTML5 history instead of hashes
   // ... other settings
   routes: [
    {
        path:'/admins/app',
        name:'Index',
        component:Index
    },
    
    {
        path: '/admins/app/admin',
        name: 'Administrador',
        component: Administrador
    },
    {
        path: '/admins/app/alumno',
        name: 'Alumno',
        component: Alumnos
    },
    {
        path: '/admins/app/experto',
        name: 'Expertos',
        component: Expertos
    },
    {
        path: '/admins/app/historial',
        name: 'Historial',
        component: Halumno
    },
    {
        path: '/admins/app/nodos',
        name: 'Nodos',
        component: Nodos
    },
    {
        path: '/admins/app/preguntas',
        name: 'Preguntas',
        component: Preguntas
    },
    {
        path: '/admins/app/profesores',
        name: 'Profesores',
        component: Profesores
    },
     {
        path: '/profesor/app/',
        name: 'Index',
        component: Index
    },
     {
       path:'/profesor/app/historialalumnosprofesor',
       name:'historialalumnosprofesor',
       component:historialalumnosprofesor
     },
      {
       path:'/profesor/app/arbolalumno',
       name:'arbolalumno',
       component:arbolalumno
     },
      {
       path:'/profesor/app/informacionpersonal',
       name:'informacion',
       component:Informacion
     },
      {
        path: '/alumno/app/',
        name: 'Index',
        component: Index
    },
         {
       path:'/alumno/app/arbolalumno',
       name:'arbol_alumno',
       component:arbolalumno
     },
      {
       path:'/alumno/app/informacionpersonal',
       name:'informacion',
       component:Informacion
     },
      {
       path:'/admins/app/resolvercuestionario',
       name:'resolvercuestionario',
       component:resolvercuestionario
     },
      {
       path:'/alumno/app/historialalumnos',
       name:'historialalumnos',
       component:historialalumnos
     },
      {
        path: '/experto/app/',
        name: 'Index',
        component: Index
    },
      {
        path: '/experto/app/nodos',
        name: 'Nodos',
        component: Nodos
    },{
      path:'/experto/app/preguntas',
      name:'expertop',
      component:expertop
    },
      {
       path:'/experto/app/informacionpersonal',
       name:'informacion',
       component:Informacion
     },
	 {
       path:'/admins/app/temas',
       name:'temas',
       component:temas
    },	
	 {
       path:'/admins/app/Preguntanodo',
       name:'Preguntanodo',
       component:temas
    },			 
]
})