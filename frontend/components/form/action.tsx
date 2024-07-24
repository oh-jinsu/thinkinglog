"use client";

import { PromiseOr } from "@/lib/promise";
import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from "react";
import { useFormState } from "react-dom";
import { ServerActionState } from "../../actions/action";

type Props = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "action"> & {
    action: (state: ServerActionState, payload: FormData) => PromiseOr<ServerActionState>;
};

export default function ActionForm({ action, children, ...props }: Props) {
    const [state, formAction] = useFormState<ServerActionState, FormData>(action, {
        message: "",
    });

    useEffect(() => {
        if (state.message) {
            alert(state.message);
        }
    }, [state]);

    return (
        <form {...props} action={formAction}>
            {children}
        </form>
    );
}
