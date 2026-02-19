export default async function handler(req, res) {
  const {
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_ADMIN_KEY,
    NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID,
  } = process.env;

  const response = await fetch(
    `https://${NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net/chat/token`,
    {
      method: 'POST',
      headers: {
        'X-Algolia-Application-Id': NEXT_PUBLIC_ALGOLIA_APP_ID,
        'X-Algolia-API-Key': ALGOLIA_ADMIN_KEY,
        'X-Algolia-Assistant-Id': NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID,
        origin: req.headers.origin || '',
        referer: req.headers.referer || '',
      },
    }
  );

  const data = await response.json();
  res.status(response.ok ? 200 : 500).json(data);
}
