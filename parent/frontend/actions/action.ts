import { PromiseOr } from "@/parent/lib/promise";
import { isRedirectError } from "next/dist/client/components/redirect";

export type ServerActionState = {
    ok: boolean;
    message: string;
} | void;

export type StatefulServerAction = (state: ServerActionState, formData: FormData) => PromiseOr<ServerActionState>;

export function ServerAction(fn: (formData: FormData) => PromiseOr<ServerActionState>): StatefulServerAction {
    return async (_, formData) => {
        try {
            const result = await fn(formData);

            return (
                result || {
                    ok: true,
                    message: "",
                }
            );
        } catch (e) {
            if (isRedirectError(e)) {
                throw e;
            }

            if (e instanceof Error) {
                return {
                    ok: false,
                    message: e.message || "알 수 없는 오류가 발생했어요.",
                };
            }

            throw e;
        }
    };
}
