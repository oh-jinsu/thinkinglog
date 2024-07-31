import FullscreenContainer from "@/frontend/components/fullscreen_container";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function Page() {
    return (
        <FullscreenContainer className="flex flex-col">
            <header className="h-[60px] border-b flex justify-between items-center">
                <input
                    contentEditable
                    className="text-xl outline-none w-full flex-1 h-full px-4"
                    placeholder="제목"
                    autoFocus
                />
            </header>
            <div contentEditable className="flex-1 outline-none p-4 overflow-auto" />
            <div className="h-[60px] border-t flex p-1">
                <button className="h-full aspect-square flex justify-center items-center rounded text-slate-700 hover:bg-slate-100">
                    <MdAddPhotoAlternate size={28} />
                </button>
            </div>
        </FullscreenContainer>
    );
}
