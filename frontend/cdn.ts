export const cdn = (key: string) => {
    return `${process.env.NEXT_PUBLIC_CDN_ORIGIN}/${key}`;
};
