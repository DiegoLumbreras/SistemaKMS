'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolSchema extends Schema {
  up () {
    this.create('rols', (table) => {
      table.increments('id')
      table.string('tipo_rol',30).notNullable().unique()
			table.timestamps()
    }) }

  down () {
    this.drop('rols')
  }
}

module.exports = RolSchema
