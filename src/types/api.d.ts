// API utility type definitions
export interface ApiRequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: any
  token?: string | null
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

export declare function apiRequest(endpoint: string, options?: ApiRequestOptions): Promise<any>
export declare function apiGet(endpoint: string, token?: string | null): Promise<any>
export declare function apiPost(endpoint: string, data?: any, token?: string | null): Promise<any>
export declare function apiPut(endpoint: string, data?: any, token?: string | null): Promise<any>
export declare function apiDelete(endpoint: string, token?: string | null): Promise<any>
export declare function getApiBaseUrl(): string
