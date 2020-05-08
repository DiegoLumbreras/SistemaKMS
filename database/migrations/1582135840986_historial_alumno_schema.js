'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorialAlumnoSchema extends Schema {
  up () {
    this.create('historial_alumnos', (table) => {
      table.increments()
      table.integer('id_cuestionario').unsigned().references('id').inTable('cuestionarios')
      table.integer('id_pregunta').unsigned().references('id').inTable('banco_preguntas')
      table.string('arespuesta',50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('historial_alumnos')
  }
}

module.exports = HistorialAlumnoSchema
