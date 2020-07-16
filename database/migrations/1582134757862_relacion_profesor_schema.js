'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelacionProfesorSchema extends Schema {
  up () {
    this.create('relacion_profesors', (table) => {
      table.increments()
      table.integer('id_profesor').unsigned().references('id').inTable('users')
      table.integer('id_alumno').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('relacion_profesors')
  }
}

module.exports = RelacionProfesorSchema
