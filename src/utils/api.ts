export function client(URL: string, limit: number | null = 100, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig
  }
  return fetch(URL, config).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return Array.isArray(data) && limit ? data.slice(0, limit) : data
    } else {
      return Promise.reject(data)
    }
  })
}
