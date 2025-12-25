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
  let chats = await store.get("chats.json", { type: "json" }) || [];

  const newSession = {
    id: Date.now(),
    session_id: body.session_id,
    messages: body.messages || [],
    created_at: new Date().toISOString()
  };

  chats.push(newSession);
  await store.set("chats.json", JSON.stringify(chats));

  return new Response(JSON.stringify({
    status: "stored",
    session: newSession
  }), {
    headers: { "Content-Type": "application/json" }
  });
};
