"use client";

import { PromiseOr } from "@/parent/lib/promise";
import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { ServerActionState } from "../actions/action";

type Props = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "action"> & {
    action: (state: ServerActionState, payload: FormData) => PromiseOr<ServerActionState>;
};

export default function ActionForm({ action, children, ...props }: Props) {
    const [state, formAction] = useFormState<ServerActionState, FormData>(action, undefined);

    useEffect(() => {
        if (!state) {
            return;
        }

        if (state.message) {
            if (state.ok) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <form {...props} action={formAction}>
            {children}
        </form>
    );
}
