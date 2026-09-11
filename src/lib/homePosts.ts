import type { Article } from "./contentful";
import { contentfulClient } from "./contentful";

export type Post = {
	title: string;
	description?: string;
	slug: string;
	authors?: Array<{
		name?: string;
		fields?: { name?: string };
	}>;
	headerImage?: {
		fields?: {
			src: string;
			file: {
				url: string;
			};
		};
	};
};

export async function getHomePosts(): Promise<Post[]> {
	const entries = await contentfulClient.getEntries<Article>({
		content_type: "article",
		order: ["-fields.publicationDate"],
	});

	return entries.items.map((item) => {
		const { title, headerImage, slug, authors, description } = item.fields;
		return {
			title,
			headerImage,
			slug,
			description,
			authors: authors as unknown as Post["authors"],
		};
	});
}