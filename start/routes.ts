import router from '@adonisjs/core/services/router'

const AppointmentsController = () => import('#controllers/appointments_controller')

router.get('/', [AppointmentsController, 'index']).as('home')
router.post('/appointments', [AppointmentsController, 'store'])

router.post('/appointments/:id/delete', [AppointmentsController, 'destroy'])