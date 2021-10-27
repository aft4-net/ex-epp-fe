enum ResponseStatus
{
    error,
    success,
    warning,
    info
}

export interface ResponseDTO<T>
{
    responseStatus: ResponseStatus;
    message: string;
    exception: any;
    data: T;
}