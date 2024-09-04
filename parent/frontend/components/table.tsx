import { cn } from "@/parent/frontend/lib/element";
import { DetailedHTMLProps, TdHTMLAttributes } from "react";

type Props = DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;

export function Th({ className, ...props }: Props) {
    return (
        <th
            {...props}
            className={cn(className, "text-center px-2 py-2 text-sm bg-slate-100 text-slate-700 border-b")}
        />
    );
}

export function Td({ className, ...props }: Props) {
    return <td {...props} className={cn(className, "text-center px-2 py-4 text-sm border-b text-slate-700")} />;
}
