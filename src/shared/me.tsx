import { AxiosResponse } from "axios";
import { http } from "./Http"

export let mePromise: Promise<AxiosResponse<{
    resources: {
        id: number;
    };
}>> | undefined

export const refreshMe = () => {
    mePromise = http.get<{ resources: { id: number } }>("/api/v1/me")
    return mePromise
}
export const fetchMe = refreshMe




