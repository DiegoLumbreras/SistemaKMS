'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UtilidadesSchema extends Schema {
  up () {
    this.create('utilidades', (table) => {
      table.increments()
      table.integer('radio')
      table.timestamps()
    })
  }

  down () {
    this.drop('utilidades')
  }
}

module.exports = UtilidadesSchema
