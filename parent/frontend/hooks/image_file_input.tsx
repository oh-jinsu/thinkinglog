import { uploadFile } from "../lib/file";
import { FileState, useFileInput } from "./file_input";
import { v4 } from "uuid";

export type ImageFileState = FileState & {
    url: string;
    width: number;
    height: number;
};

export async function* imageFileInputGenerator(file: File): AsyncGenerator<ImageFileState> {
    if (!file.type.startsWith("image/")) {
        return;
    }

    const uploading = await new Promise<ImageFileState>((resolve, reject) => {
        const image = new Image();

        const url = URL.createObjectURL(file);

        image.src = url;

        image.onload = () => {
            resolve({
                state: "upload",
                key: v4(),
                file,
                url,
                width: image.width,
                height: image.height,
            });
        };

        image.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });

    yield uploading;

    const { id } = await uploadFile(uploading.file);

    yield {
        ...uploading,
        state: "complete",
        id,
    } satisfies ImageFileState;
}

export function useImageInput() {
    return useFileInput(imageFileInputGenerator);
}
