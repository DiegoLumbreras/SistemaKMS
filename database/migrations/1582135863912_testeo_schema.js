'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TesteoSchema extends Schema {
  up () {
    this.create('testeos', (table) => {
      table.increments()
      table.timestamps()
      table.integer('variable1').unsigned()
      table.integer('variable2').unsigned()
      table.integer('variable3').unsigned()
    })
  }

  down () {
    this.drop('testeos')
  }
}

module.exports = TesteoSchema
