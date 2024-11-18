export interface AxiosCustomError {
  response: {
    data: {
      message: string
    }
  }
}

export interface LeoApiError {
  response: {
    data: {
      detail: string
    }
  }
}

export type AxiosCustomResponse<T> =
  | {
      data: T
      error?: undefined
    }
  | {
      data?: undefined
      error: string
    }
