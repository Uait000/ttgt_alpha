import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { Hono } from "hono";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import appealsRouter from "./functions/appeals-api/index.ts";
import contentRouter from "./functions/content-api/index.ts";
import newsRouter from "./functions/news-api/index.ts";

const app = new Hono();

app.route("/", appealsRouter);
app.route("/", contentRouter);
app.route("/", newsRouter);

Deno.serve({port: 12345}, app.fetch);
