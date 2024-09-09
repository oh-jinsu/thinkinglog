export const toSlug = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, "-")
        .replace(/^-|-$/g, "");
};
