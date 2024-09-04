import { APIException } from "@/parent/backend/api/exception";
import { signFileAPI } from "@/parent/backend/api/files/sign";

export const uploadFile = async (file: File, metadata: unknown = {}) => {
    const { name, type, size } = file;

    const res = await signFileAPI.fetch({ body: { name, type, size, metadata } });

    if (res instanceof APIException) {
        throw res;
    }

    const { id, signedUrl } = res;

    {
        const res = await fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": type,
            },
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }
    }

    return {
        id,
    };
};
