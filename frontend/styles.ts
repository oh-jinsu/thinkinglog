export const labelStyle = "block mt-2 mb-4";

export const inputBackgroundStyle = "border bg-gray-100 outline-none";

export const formInputStyle = `rounded text-[16px] w-full h-fit py-2 px-3 ${inputBackgroundStyle}`;

export const baseButtonStyle =
    "cursor-pointer flex items-center justify-center whitespace-nowrap text-ellipsis overflow-hidden";

export const primaryButtonStyle = `${baseButtonStyle} rounded bg-primary text-white hover:bg-gray-700`;

export const roundedPrimaryButtonStyle = `${baseButtonStyle} rounded-full bg-primary text-white hover:bg-gray-700`;

export const disabledButtonStyle = `${baseButtonStyle} bg-gray-200 text-gray-400`;

export const outlineButtonStyle = `${baseButtonStyle} bg-white border border-primary text-primary hover:bg-blue-50`;

export const dangerousOutlineButtonStyle = `${baseButtonStyle} bg-white border border-red-500 text-red-500 hover:bg-red-100`;

export const bigButtonStyle = `w-[200px] h-[50px] text-xl ${roundedPrimaryButtonStyle}`;

export const simpleButtonStyle =
    "text-gray-700 hover:bg-gray-200 active:bg-gray-200 cursor-pointer flex justify-center items-center relative rounded outline-none";
