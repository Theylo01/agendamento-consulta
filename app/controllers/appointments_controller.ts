import type { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'
import { DateTime } from 'luxon'

export default class AppointmentsController {
  async index({ view }: HttpContext) {
    const appointments = await Appointment.query().orderBy('appointment_date', 'asc')
    return view.render('pages/home', { appointments })
  }

  async destroy({ params, response, session }: HttpContext) {
  const appointment = await Appointment.find(params.id)

    if (!appointment) {
      session.flash('error', 'Consulta não encontrada.')
      return response.redirect().back()
    }

  await appointment.delete()

  session.flash('success', 'Consulta removida com sucesso!')
  return response.redirect().toRoute('home')
  }

  async store({ request, response, session }: HttpContext) {
    const patientName = request.input('patient_name')
    const phone = request.input('phone')
    const cpf = request.input('cpf')
    const appointmentDateStr = request.input('appointment_date')

    if (!patientName || !phone || !cpf || !appointmentDateStr) {
      session.flash('error', 'Todos os campos são obrigatórios.')
      return response.redirect().back()
    }

    const appointmentDate = DateTime.fromISO(appointmentDateStr)

    if (!appointmentDate.isValid) {
      session.flash('error', 'Data e hora inválidas.')
      return response.redirect().back()
    }

    // Verifica duplicata antes de inserir
    const existing = await Appointment.query()
      .where('appointment_date', appointmentDate.toISO()!)
      .first()

    if (existing) {
      session.flash('error', 'Já existe uma consulta agendada para esse horário.')
      return response.redirect().back()
    }

    await Appointment.create({ patientName, phone, cpf, appointmentDate })

    session.flash('success', 'Consulta agendada com sucesso!')
    return response.redirect().toRoute('home')
  }
}