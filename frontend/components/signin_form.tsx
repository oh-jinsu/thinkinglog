import { SignInServerAction } from "../actions/auth/signin";
import SubmitButton from "../submit_button";
import ActionForm from "./form/action";
import FormInput from "./form/input";
import FormLabel from "./form/label";
import RedirectUrlInput from "./form/redirect_input";

export default function SignInForm() {
    return (
        <ActionForm action={SignInServerAction} className="max-w-[400px] w-full">
            <FormLabel>아이디</FormLabel>
            <FormInput name="username" type="text" placeholder="아이디를 입력해 주세요." required />
            <FormLabel>비밀번호</FormLabel>
            <FormInput name="password" type="password" placeholder="비밀번호를 입력해 주세요." required />
            <SubmitButton>로그인</SubmitButton>
            <RedirectUrlInput />
        </ActionForm>
    );
}
