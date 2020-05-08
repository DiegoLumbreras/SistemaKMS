'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemaSchema extends Schema {
  up () {
    this.create('temas', (table) => {
      table.increments()
      table.string('nombre_tema',30).notNullable()
      table.integer('nivel').unsigned().notNullable()
      table.float('freex').notNullable()
      table.float('freey').notNullable()
			table.boolean('textPosition').defaultTo(0)
			table.timestamps()
    })
  }

  down () {
    this.drop('temas')
  }
}

module.exports = TemaSchema
