'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BancoPreguntaSchema extends Schema {
  up () {
    this.create('banco_preguntas', (table) => {
      table.increments()
      table.string('pregunta',200).notNullable()
      table.string('respuesta',200).notNullable()
      table.string('tipo',200).notNullable()

       table.string('opcion',200)
       table.string('opcion2',200)
       table.string('opcion3',200)
       table.string('opcion4',200)
      table.integer('id_tema').unsigned().references('id').inTable('temas')
      
			table.timestamps()
    })
  }

  down () {
    this.drop('banco_preguntas')
  }
}

module.exports = BancoPreguntaSchema
