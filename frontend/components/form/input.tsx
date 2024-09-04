import { formInputStyle } from "@/frontend/styles";
import { cn } from "@/parent/frontend/lib/element";
import React, { forwardRef } from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, Props>(function Component({ children, className, ...props }, ref) {
    return <input {...props} ref={ref} className={cn(className, formInputStyle)} />;
});

export default FormInput;
