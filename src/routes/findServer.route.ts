import express from 'express'
// CONTROLLER
import * as serverController from '../controllers/authConfig.controller'

const router = express.Router({ mergeParams: true })

router.route('/').get(serverController.getOnlineServer)
export default router
