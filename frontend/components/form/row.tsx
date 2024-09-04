import { labelStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";
import { ReactNode } from "react";

type Props = {
    label: string;
    children?: ReactNode;
};

export default function FormRow({ label, children }: Props) {
    return (
        <label className={cn(labelStyle)}>
            <p className={cn("mb-2")}>{label}</p>
            {children}
        </label>
    );
}
