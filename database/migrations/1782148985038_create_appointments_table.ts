import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  // nome da tabela no banco de dados
  protected tableName = 'appointments'

  // função responsável por criar as colunas da tabela
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // ID de cada registro
      table.increments('id')

      // Dados pessoais
      table.string('patient_name', 255).notNullable()
      table.string('phone', 20).notNullable()
      table.string('cpf', 14).notNullable()

      // data da consulta -- useTz diz ao servidor qual fuso horário ele deve usar para não bugar
      table.timestamp('appointment_date', { useTz: true }).notNullable().unique()

      // data e hora de criação e atualização do registro -- será registrado automaticamente através de "models"
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}