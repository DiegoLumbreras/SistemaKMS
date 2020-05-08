'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelacionNodoAlumnoSchema extends Schema {
  up () {
    this.create('relacion_nodo_alumnos', (table) => {
      table.increments()
      table.timestamps()
      table.integer('id_alumno').unsigned().references('id').inTable('users')
      table.integer('id_tema').unsigned().references('id').inTable('temas')
      table.integer('ponderacion').unsigned()
      table.string('clasificacion',30).notNullable()
      
    })
  }

  down () {
    this.drop('relacion_nodo_alumnos')
  }
}

module.exports = RelacionNodoAlumnoSchema
