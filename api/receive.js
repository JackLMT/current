import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed"
    });
  }

  const filePath = path.join(process.cwd(), "api", "data.json");

  let data = [];

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.push({
    receivedAt: new Date().toISOString(),
    ...req.body
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return res.status(200).json({
    success: true,
    message: "Data saved",
    data: req.body
  });
}
