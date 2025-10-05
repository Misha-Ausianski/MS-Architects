export type DownloadItem = { title: string; url: string };
export type Page = { slug: string; title: string; content: string; downloads?: DownloadItem[] };
