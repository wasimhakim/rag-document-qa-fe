export type UploadResponse = {
  message: string
}

export type AskResponse = {
  data: string
}

export const API_HOST = 'http://127.0.0.1:8000'

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_HOST}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Upload failed. Please try again.')
  }

  return (await response.json()) as UploadResponse
}

export async function askQuestion(query: string): Promise<AskResponse> {
  const url = new URL(`${API_HOST}/ask`)
  url.searchParams.set('query', query)

  const response = await fetch(url.toString(), {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Chat request failed. Please try again.')
  }

  return (await response.json()) as AskResponse
}
