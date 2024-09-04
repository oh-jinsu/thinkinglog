import FormInput from "./form/input";
import RedirectUrlInput from "./form/redirect_input";
import { buttonStyle } from "../styles";
import { Suspense } from "react";
import ActionForm from "@/parent/frontend/components/form";
import { signInServerAction } from "@/parent/frontend/actions/auth/signin";
import FormRow from "./form/row";
import SubmitButton from "@/parent/frontend/components/submit_button";
import { cn } from "@/parent/frontend/lib/element";

export default function SignInForm() {
    return (
        <ActionForm action={signInServerAction} className="px-4 max-w-[400px] w-full">
            <FormRow label="아이디">
                <FormInput name="id" type="text" placeholder="아이디를 입력해 주세요." required />
            </FormRow>
            <FormRow label="비밀번호">
                <FormInput name="password" type="password" placeholder="비밀번호를 입력해 주세요." required />
            </FormRow>
            <SubmitButton className={cn("w-full h-[50px] mt-4", buttonStyle)}>로그인</SubmitButton>
            <Suspense>
                <RedirectUrlInput />
            </Suspense>
        </ActionForm>
    );
}
