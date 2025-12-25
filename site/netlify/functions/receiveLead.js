exports.handler = async (event) => {
  
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "POST only" })
    };
  }

  const data = JSON.parse(event.body || "{}");

  console.log("New Lead Received:", data);

  // OPTIONAL: Save to Netlify Blobs later
  // For now just acknowledge

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: true,
      message: "Lead stored successfully",
      received: data
    }),
  };
};
