import httpStatus from 'http-status'

import catchAsync from '../utils/catchAsync'
import { findServer } from '../utils/findServer'
import { listServer } from '../constants/server'

export const getOnlineServer = catchAsync(async (req, res) => {
  const result = await findServer(listServer)
  if (result) {
    res.status(httpStatus.OK).send({
      online_server: result,
    })
  } else {
    res.status(400).send({
      message: 'no servers are online',
    })
  }
})
