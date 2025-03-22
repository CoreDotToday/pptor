import axios from './config'

// export const SERVER_URL = 'http://localhost:5000'
// export const SERVER_URL = (import.meta.env.MODE === 'development') ? '/api' : 'https://server.pptist.cn'
export const SERVER_URL = (import.meta.env.MODE === 'development') ? '/api' : '/api'
// export const ASSET_URL = 'https://asset.pptist.cn'
export const ASSET_URL = 'https://ppt.core.today'

export default {
  getMockData(filename: string): Promise<any> {
    return axios.get(`./mocks/${filename}.json`)
  },

  getFileData(value?: string): Promise<any> {
    const urlParams = new URLSearchParams(window.location.search)
    const filenameParam = urlParams.get('filename')
    
    console.log('value:', value)
    console.log('filenameParam:', filenameParam)
    console.log('type of filenameParam:', typeof filenameParam)
    
    const filename = filenameParam || value || 'slides'
    console.log('Final filename:', filename)
    
    return axios.get(`${ASSET_URL}/data/${filename}.json`)
      .catch(error => {
        console.error('Error loading file:', error)
        throw error
      })
  },

  AIPPT_Outline(
    content: string,
    language: string,
    model: string,
  ): Promise<any> {
    return fetch(`${SERVER_URL}/tools/aippt_outline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        language,
        model,
        stream: true,
      }),
    })
  },

  AIPPT(
    content: string,
    language: string,
    model: string,
  ): Promise<any> {
    return fetch(`${SERVER_URL}/tools/aippt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        language,
        model,
        stream: true,
      }),
    })
  },
}