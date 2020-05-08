'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('nombre',40).notNullable()
      table.string('apellido_paterno',50).notNullable()
      table.string('apellido_materno',50).notNullable()
      table.string('matricula',50).notNullable().unique()
      table.string('password',90).notNullable()
      table.string('nivel_academico',60)
      table.integer('id_rol').unsigned().references('id').inTable('rols')
			table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsuarioSchema
