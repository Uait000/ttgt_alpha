import { Hono } from "hono";
import supabase from "../../";

const router = new Hono().basePath("/news-api");

// GET /news-api - Get all published news
router.get("/", async (c) => {
	const url = new URL(c.req.url);

	const category = url.searchParams.get("category");
	const limit = parseInt(url.searchParams.get("limit") || "10");
	const offset = parseInt(url.searchParams.get("offset") || "0");

	let query = supabase
		.from("news")
		.select("*", { count: "exact" })
		.eq("published", true)
		.order("published_at", { ascending: false })
		.range(offset, offset + limit - 1);

	if (category) {
		query = query.eq("category", category);
	}

	const { data, error, count } = await query;

	if (error) throw error;

	c.json({ data, count, limit, offset });
});

// GET /news-api/:slug - Get single news by slug
router.get("/:slug", async (c) => {
	const { slug } = c.req.param();

	const { data, error } = await supabase
		.from("news")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.maybeSingle();

	if (error) throw error;

	if (!data) {
		c.json({ error: "News not found" }, 404);
		return;
	}

	// Increment views
	await supabase
		.from("news")
		.update({ views: (data.views || 0) + 1 })
		.eq("id", data.id);

	c.json({ data });
});

// POST /news-api/:id/like - Like a news article
router.post("/:id/like", async (c) => {
	//TODO: Сделать лайки

	// Сначала надо сделать аккаунты
	// и сохранять лайки каждого человека,
	// чтобы один человек не накрутил лайков.
	c.json({ error: "Not implemented" }, 501);
	return;

	const newsId = pathParts[1];

	const { data: news, error: fetchError } = await supabase
		.from("news")
		.select("likes")
		.eq("id", newsId)
		.maybeSingle();

	if (fetchError) throw fetchError;
	if (!news) {
		c.json({ error: "News not found" }, 404);
		return;
	}

	const { data, error } = await supabase
		.from("news")
		.update({ likes: (news.likes || 0) + 1 })
		.eq("id", newsId)
		.select()
		.single();

	if (error) throw error;

	c.json({ data });
});

export default router;
