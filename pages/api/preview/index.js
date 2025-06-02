import CONFIG from "@config/config";


export default async function handler(req, res) {
  const { secret, url, status } = req.query;

  if (secret !== CONFIG.preview.secretKey) {
    return res.status(401).send("Invalid token");
  }

  if (status === "published") {
    res.clearPreviewData();
  } else {
    res.setPreviewData({});
  }


  res.writeHead(307, { Location: url || "/" });
  res.end();
}