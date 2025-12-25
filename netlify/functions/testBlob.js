import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("chatbot-data");

  await store.set(
    "hello.json",
    JSON.stringify({ message: "Blob storage is working" })
  );

  return new Response(
    JSON.stringify({ status: "written to blobs" }),
    { headers: { "Content-Type": "application/json" } }
  );
};
