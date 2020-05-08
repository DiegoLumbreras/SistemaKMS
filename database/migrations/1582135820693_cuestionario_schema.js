'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CuestionarioSchema extends Schema {
  up () {
    this.create('cuestionarios', (table) => {
      table.increments()
      table.timestamps()
      table.integer('id_alumno').unsigned().references('id').inTable('users')
      table.integer('porcentaje').unsigned()
    })
  }

  down () {
    this.drop('cuestionarios')
  }
}

module.exports = CuestionarioSchema
