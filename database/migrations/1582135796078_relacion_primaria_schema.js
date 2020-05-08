'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelacionPrimariaSchema extends Schema {
  up () {
    this.create('relacion_primarias', (table) => {
      table.increments()
      table.integer('id_padre').unsigned().references('id').inTable('temas')
      table.integer('id_hijo').unsigned().references('id').inTable('temas')
      table.string('tipo',200).notNullable()
			table.timestamps()
    })
  }

  down () {
    this.drop('relacion_primarias')
  }
}

module.exports = RelacionPrimariaSchema
