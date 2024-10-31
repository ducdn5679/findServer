// import { cloneDeep } from "lodash";
import axios from 'axios'

export const checkServer = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
    })
    if (response.status >= 200 || response.status <= 299) {
      return true
    } else {
      return false
    }
  } catch (errors) {
    console.log(errors?.message)
    return false // If there's an error (like network issues), consider the server offline
  }
}

export const findServer = async (listServer: any[]): Promise<string | null> => {
  const listServerClone = [...listServer]
  listServerClone.sort((a, b) => a.priority - b.priority)
  for (const server of listServerClone) {
    const result = await checkServer(server.url)
    if (result) {
      return server.url
    }
  }
  return null
}
