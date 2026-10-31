import type { ApiError } from "../errors/apiError";

export type  Success<T> = {
    success: true;
    data: T;
};

export type Failure = {
    success: false;
    error: ApiError;
}

export type ApiResponse<T> =  Success<T> | Failure;
