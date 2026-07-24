// Keeps your Anthropic API key on the server instead of in the browser.
// Deploy on Netlify, set ANTHROPIC_API_KEY in Site settings > Environment variables,
// then point the fetch in index.html at "/.netlify/functions/style".

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Use POST." };
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return { statusCode: 500, body: "ANTHROPIC_API_KEY is not set on this site." };
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: event.body
    });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json" },
      body: text
    };
  } catch (err) {
    return { statusCode: 502, body: "Upstream request failed: " + err.message };
  }
};
