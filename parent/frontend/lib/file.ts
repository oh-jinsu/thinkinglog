import { cdn } from "@/frontend/cdn";
import { APIException } from "@/parent/backend/api/exception";
import { signFileAPI } from "@/parent/backend/api/files/sign";

export const uploadFile = async (
    file: File,
    metadata: unknown = {},
): Promise<{
    fileId: string;
    key: string;
    href: string;
}> => {
    const { name, type, size } = file;

    const res = await signFileAPI.fetch({ body: { name, type, size, metadata } });

    if (res instanceof APIException) {
        throw res;
    }

    const { id: fileId, key, signedUrl } = res;

    {
        const res = await fetch(signedUrl, {
            method: "PUT",
            body: file,
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }
    }

    return {
        fileId,
        key,
        href: cdn(key),
    };
};
