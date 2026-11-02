import { api_url } from "../configs/api";
import type { ApiResponse } from "../types/apiResponse";
import { handleHttpError, handleUnknownError } from "../errors/errorHandler";

export async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${api_url}${endpoint}`, options);

        if (!response.ok) {
            return {
                success: false,
                error: await handleHttpError(response)
            };
        }

        if (response.status === 204) {
            return {
                success: true,
                data: undefined as T
            };
        }

        const data: T = await response.json();

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            error: handleUnknownError(error)
        };
    }
}