'use strict'

/*
|--------------------------------------------------------------------------
| RolSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database') 
const Hash = use('Hash')
class RolSeeder {
  async run () {
		 //const users = await Database.table('rols') console.log(rols)	
		//const user = await Factory.model('App/Models/Rol') .create({ tipo_rol: 'admin' })
		const Administrador = await Database.from('rols').insert([{tipo_rol: 'Administrador'}])		
		const Experto = await Database.from('rols').insert([{tipo_rol: 'Experto'}])
		const Maestro = await Database.from('rols').insert([{tipo_rol: 'Maestro'}])
		const Alumno = await Database.from('rols').insert([{tipo_rol: 'Alumno'}])

		const u1= await Database.from('users').insert([{nombre: 'Cristian',
																									 apellido_paterno: 'Echareta',
																									apellido_materno: 'De la Rosa',
																									matricula: '1530229',
																									password:await Hash.make('123'),
																									nivel_academico:'2',
																									id_rol: '2'}])
			const u2= await Database.from('users').insert([{nombre: 'Eduardo',
																									 apellido_paterno: 'Apellido Pat',
																									apellido_materno: 'Apellido mat',
																									matricula: '1630031',
																									password:await Hash.make('123'),
																									nivel_academico:'2',
																									id_rol: '2'}])
			const u3= await Database.from('users').insert([{nombre: 'Victor',
																									 apellido_paterno: 'Apellido Pat',
																									apellido_materno: 'Apellido mat',
																									matricula: '123',
																									password:await Hash.make('123'),
																									nivel_academico:'2',
																									id_rol: '2'}])	
			
			const u4= await Database.from('users').insert([{nombre: 'Tomás',
																									 apellido_paterno: 'Navarro',
																									apellido_materno: 'Angeles',
																									matricula: '1730036',
																									password:await Hash.make('123'),
																									nivel_academico:'2',
																									id_rol: '1'}])	
			
			const u5= await Database.from('users').insert([{nombre: 'Froylan',
																						 apellido_paterno: 'Wbario',
																						apellido_materno: 'Martinez',
																						matricula: '1530006',
																						password:await Hash.make('123'),
																						nivel_academico:'2',
																						id_rol: '1'}])
			
			const u6= await Database.from('users').insert([{nombre: 'Alejandro',
																					 apellido_paterno: 'Segura',
																					apellido_materno: 'Hernandez',
																					matricula: '1630166',
																					password:await Hash.make('123'),
																					nivel_academico:'2',
																					id_rol: '1'}])

			const u6= await Database.from('users').insert([{nombre: 'Diego',
																		 apellido_paterno: 'Lumbreras',
																		apellido_materno: 'Vega',
																		matricula: '1530334',
																		password:await Hash.make('123'),
																		nivel_academico:'2',
																		id_rol: '1'}])

	

		await Database.from('temas').insert([{
			'nombre_tema':'Padre',
			'nivel':0,
			'freex': 100,
			'freey': 30
		}])
  }
}

module.exports = RolSeeder

