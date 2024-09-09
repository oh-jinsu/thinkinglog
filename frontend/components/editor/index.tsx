import { data } from "@/backend/db";
import EditorToolbar from "./toolbar";
import EditorContent from "./content";

type Props = {
    user: {
        id: string;
    };
};

export default async function Editor({ user }: Props) {
    const categories = await data.query.categoryTable.findMany({
        where(t, { eq }) {
            return eq(t.userId, user.id);
        },
    });

    return (
        <div className="flex-1 flex flex-col max-w-[768px] w-full mx-auto">
            <select
                name="categoryId"
                className="w-full appearance-none cursor-pointer outline-none px-4 py-3 rounded text-gray-400 hover:bg-gray-100"
            >
                <option value="">카테고리</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <input
                type="title"
                name="title"
                placeholder="제목을 입력하세요"
                autoFocus
                className="text-3xl font-semibold w-full px-4 py-4 rounded outline-none hover:bg-gray-100"
            />
            {/* <input
                type="tags"
                placeholder="태그를 쉼표(,)로 구분해 입력하세요"
                className="w-full px-4 py-4 rounded outline-none hover:bg-gray-100"
            /> */}
            <EditorToolbar />
            <EditorContent />
        </div>
    );
}
