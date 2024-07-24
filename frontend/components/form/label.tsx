import { labelStyle } from "@/frontend/styles";
import { cn } from "@/lib/element";

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export default function FormLabel({ children, className, ...props }: Props) {
    return <label {...props} className={cn(className, labelStyle)}>{children}</label>
}
