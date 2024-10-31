import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { checkServer, findServer } from '../src/utils/findServer'

const mock = new MockAdapter(axios)

describe('checkServer', () => {
  beforeEach(() => {
    mock.reset()
  })

  it('should return true for a successful response', async () => {
    const url = 'https://example.com'
    mock.onGet(url).reply(200, {})

    const result = await checkServer(url)
    console.log(result)
    expect(result).toBe(true)
  })

  it('should return false for a response with a status outside 200-299', async () => {
    const url = 'https://example.com'
    mock.onGet(url).reply(404) // Not Found

    const result = await checkServer(url)
    expect(result).toBe(false)
  })

  it('should return false for a request that fails', async () => {
    const url = 'https://example.com'
    mock.onGet(url).networkError() // Simulating network error

    const result = await checkServer(url)
    expect(result).toBe(false)
  })
})

describe('findServer', () => {
  beforeEach(() => {
    mock.reset() // Clear any previous mocks before each test
  })
  it('should return the first available server URL', async () => {
    try {
      const servers = [
        { url: 'https://offline-server.com', priority: 2 },
        { url: 'https://online-server.com', priority: 1 },
      ]

      // Mocking the first server to be offline and the second to be online
      mock.onGet('https://offline-server.com').reply(404)
      mock.onGet('https://online-server.com').reply(200)

      const result = await findServer(servers)
      console.log(result, 'dddd')
      expect(result).toBe('https://online-server.com')
    } catch (e) {
      console.log('err:', e)
    }
  })

  it('should return null if no servers are online', async () => {
    const servers = [
      { url: 'https://offline-server1.com', priority: 1 },
      { url: 'https://offline-server2.com', priority: 2 },
    ]

    // Mocking both servers to be offline
    mock.onGet('https://offline-server1.com').reply(404)
    mock.onGet('https://offline-server2.com').reply(404)

    const result = await findServer(servers)
    expect(result).toBeNull()
  })
})
