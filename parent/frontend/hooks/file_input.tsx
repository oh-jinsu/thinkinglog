import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, MouseEventHandler, useRef, useState } from "react";
import { v4 } from "uuid";
import { uploadFile } from "../lib/file";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type FileState = {
    state: "upload" | "complete";
    key: string;
    file: File;
    id?: string;
};

export type FileInputGenerator<T> = (file: File) => AsyncGenerator<T>;

export async function* fileInputGenerator(file: File): AsyncGenerator<FileState> {
    const uploading = {
        state: "upload",
        key: v4(),
        file,
    } satisfies FileState;

    yield uploading;

    const { id } = await uploadFile(file);

    yield {
        ...uploading,
        state: "complete",
        id,
    } satisfies FileState;
}

export function useFileInput<T extends FileState>(generator: FileInputGenerator<T> = fileInputGenerator as any) {
    const [files, setFiles] = useState<T[]>([]);

    const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        e.preventDefault();

        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        for (const file of Array.from(files)) {
            const iterator = generator(file);

            for await (const result of iterator) {
                setFiles((files) => {
                    if (files.some(({ key }) => key === result.key)) {
                        return files.map((file) => (file.key === result.key ? result : file));
                    }

                    return [...files, result];
                });
            }
        }
    };

    function Input({ name, ...props }: InputProps) {
        const ref = useRef<HTMLInputElement>(null);

        const onClick: MouseEventHandler = (e) => {
            e.preventDefault();

            if (!ref.current) {
                return;
            }

            ref.current.value = "";

            ref.current.click();
        };

        return (
            <>
                <button type="button" onClick={onClick}>
                    파일 선택
                </button>
                <input
                    {...props}
                    ref={ref}
                    type="file"
                    onChange={onChange}
                    style={{
                        display: "none",
                    }}
                />
                <input
                    type="hidden"
                    name={name}
                    value={files
                        .filter(({ id }) => id)
                        .map(({ id }) => id)
                        .join(",")}
                />
            </>
        );
    }

    return [files, Input] as const;
}
