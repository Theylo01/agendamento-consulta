import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'


// Por convenção do AdonisJS, o nome desta classe 'Appointment' (no singular) faz ele procurar automaticamente uma tabela chamada 'appointments' (no plural) no banco de dados.
export default class Appointment extends BaseModel {

    // O AdonisJS vai procurar essas colunas no banco de dados, o mesmo tem um sistema inteligente que converte nomes como: patientName para patient_name então não da nenhum problema
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare patientName: string

    @column()
    declare phone: string

    @column()
    declare cpf: string

    @column.dateTime()
    declare appointmentDate: DateTime

    // quando criado a data e hora e registrada
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    // quando criado a data e hora e registrada e quando e atualizado também
    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}