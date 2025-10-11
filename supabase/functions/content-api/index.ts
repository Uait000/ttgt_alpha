import { Hono } from "hono";
import supabase from "../../";

const router = new Hono().basePath("/content-api");

router.get("/", (c) => {
	const resource = c.query("resource");

	switch (resource) {
		// GET /content-api?resource=vacancies - Get all active vacancies
		case "vacancies":
			const { data, error } = await supabase
				.from("vacancies")
				.select("*")
				.eq("active", true)
				.order("created_at", { ascending: false });

			if (error) throw error;

			c.json({ data });
			return;

		// GET /content-api?resource=events - Get upcoming events
		case "events":
			const { data, error } = await supabase
				.from("events")
				.select("*")
				.gte("start_date", new Date().toISOString())
				.order("start_date", { ascending: true });

			if (error) throw error;

			c.json({ data });
			return;

		// GET /content-api?resource=comments&news_id=xxx - Get comments for news
		case "comments":
			const newsId = url.searchParams.get("news_id");

			if (!newsId) {
				c.json({ error: "news_id parameter is required" }, 400);
				return;
			}

			const { data, error } = await supabase
				.from("comments")
				.select("*")
				.eq("news_id", newsId)
				.eq("approved", true)
				.order("created_at", { ascending: false });

			if (error) throw error;

			c.json({ data });
			return;
	}

	c.json({ error: "Invalid resource" }, 400);
});

router.post("/", (c) => {
	const resource = c.query("resource");

	switch (resource) {
		// POST /content-api?resource=comments - Create new comment
		case "comments":
			const { news_id, author_name, author_email, content } = await c.req.json();

			if (!news_id || !author_name || !content) {
				c.json(
					{
						error: "Missing required fields",
						required: ["news_id", "author_name", "content"],
					},
					400,
				);
				return;
			}

			const { data, error } = await supabase
				.from("comments")
				.insert({
					news_id,
					author_name,
					author_email: author_email || null,
					content,
					approved: false,
				})
				.select()
				.single();

			if (error) throw error;

			c.json(
				{
					data,
					message: "Comment submitted for moderation",
				},
				201,
			);
	}

	c.json({ error: "Invalid resource" }, 400);
});
