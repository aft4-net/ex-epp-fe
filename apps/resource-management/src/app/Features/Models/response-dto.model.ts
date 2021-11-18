export interface ResponseDto<T>{
    responseStatus: string
    message: string
    data: T
}