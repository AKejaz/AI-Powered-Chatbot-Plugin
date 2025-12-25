import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("chatbot-data");

  const leads = await store.get("leads.json", { type: "json" }) || [];
  const chats = await store.get("chats.json", { type: "json" }) || [];

  return new Response(JSON.stringify({
    leads,
    chats,
    count: {
      leads: leads.length,
      chats: chats.length
    }
  }), {
    headers: { "Content-Type": "application/json" }
  });
};
