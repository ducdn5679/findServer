import express from 'express'

// ROUTES
import findServer from './findServer.route'

const router = express.Router()

router.use('/server', findServer)

export default router
