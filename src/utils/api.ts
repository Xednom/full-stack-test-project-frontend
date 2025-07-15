// API utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface ApiRequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
  token?: string
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Make an authenticated API request
 */
export async function apiRequest(
  endpoint: string, 
  options: ApiRequestOptions = {}
): Promise<any> {
  const { method = 'GET', headers = {}, body, token } = options
  
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`
  
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  }
  
  // Add authorization header if token is provided
  if (token) {
    requestHeaders['Authorization'] = `Token ${token}`
  }
  
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders
  }
  
  if (body && method !== 'GET') {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
  }
  
  try {
    const response = await fetch(url, requestOptions)
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`
      let errorData = null
      
      try {
        errorData = await response.json()
        errorMessage = errorData.message || errorData.detail || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }
      
      throw new ApiError(response.status, errorMessage, errorData)
    }
    
    // Handle empty responses
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    
    return null
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network error or server unavailable', error)
  }
}

/**
 * GET request
 */
export function apiGet(endpoint: string, token?: string) {
  return apiRequest(endpoint, { method: 'GET', token })
}

/**
 * POST request
 */
export function apiPost(endpoint: string, data?: any, token?: string) {
  return apiRequest(endpoint, { method: 'POST', body: data, token })
}

/**
 * PUT request
 */
export function apiPut(endpoint: string, data?: any, token?: string) {
  return apiRequest(endpoint, { method: 'PUT', body: data, token })
}

/**
 * DELETE request
 */
export function apiDelete(endpoint: string, token?: string) {
  return apiRequest(endpoint, { method: 'DELETE', token })
}

/**
 * Get the API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL
}
