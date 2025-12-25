import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "POST only" }), {
      headers: { "Content-Type": "application/json" },
      status: 405
    });
  }

  const body = await req.json();

  const store = getStore("chatbot-data");
  let leads = await store.get("leads.json", { type: "json" }) || [];

  const newLead = {
    id: Date.now(),
    name: body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    page_url: body.page_url || "",
    last_query: body.last_query || "",
    created_at: new Date().toISOString()
  };

  leads.push(newLead);
  await store.set("leads.json", JSON.stringify(leads));

  return new Response(JSON.stringify({
    status: "stored",
    lead: newLead
  }), {
    headers: { "Content-Type": "application/json" }
  });
};
