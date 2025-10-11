import { Hono } from "hono";
import supabase from "../../";

const router = new Hono().basePath("/appeals-api");

router.post("/", (c) => {
	const body = await req.json();
	const { full_name, email, phone, subject, message } = body;

	// Validation
	if (!full_name || !email || !subject || !message) {
		c.json(
			{
				error: "Missing required fields",
				required: ["full_name", "email", "subject", "message"],
			},
			400,
		);
		return;
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		c.json({ error: "Invalid email format" }, 400);
		return;
	}

	const { data, error } = await supabase
		.from("citizen_appeals")
		.insert({
			full_name,
			email,
			phone: phone || null,
			subject,
			message,
			status: "new",
		})
		.select()
		.single();

	if (error) throw error;

	c.json(
		{
			data,
			message: "Appeal submitted successfully. We will contact you soon.",
		},
		201,
	);
});

export default router;
