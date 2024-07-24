import { PromiseOr } from "@/lib/promise";
import { isRedirectError } from "next/dist/client/components/redirect";

export type ServerActionState = {
    message: string;
};

export type StatefulServerAction = (state: ServerActionState, formData: FormData) => PromiseOr<ServerActionState>;

export function ServerAction(fn: (formData: FormData) => any): StatefulServerAction {
    return async (_, formData) => {
        try {
            await fn(formData);

            return {
                message: "",
            };
        } catch (e) {
            if (isRedirectError(e)) {
                throw e;
            }

            if (e instanceof Error) {
                return {
                    message: e.message || "알 수 없는 오류가 발생했어요.",
                };
            }

            throw e;
        }
    };
}
