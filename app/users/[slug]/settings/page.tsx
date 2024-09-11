import { findUserBySlug } from "@/frontend/cache/user";
import Avatar from "@/frontend/components/avatar";
import FormRow from "@/frontend/components/form/row";
import MainHeader from "@/frontend/components/main/header";
import { formInputStyle } from "@/frontend/styles";

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: Props) {
    const user = await findUserBySlug(params.slug);

    return (
        <>
            <MainHeader />
            <form className="max-w-[932px] w-full mx-auto">
                <Avatar className="w-[100px] h-[100px]" />
                <FormRow label="이름">
                    <input type="text" name="name" className={formInputStyle} />
                </FormRow>
                <FormRow label="이름">
                    <textarea name="name" className={formInputStyle} />
                </FormRow>
            </form>
        </>
    );
}
