import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed"
    });
  }

  try {
    const filePath = path.join(process.cwd(), "data.json");

    let messages = [];

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf8");

      if (file.trim()) {
        messages = JSON.parse(file);
      }
    }

    const newMessage = {
      id: messages.length + 1,
      receivedAt: new Date().toISOString(),
      ...req.body
    };

    messages.push(newMessage);

    fs.writeFileSync(
      filePath,
      JSON.stringify(messages, null, 2)
    );

    return res.status(200).json({
      success: true,
      message: "POST received and saved",
      data: newMessage
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Could not save data"
    });
  }
}
