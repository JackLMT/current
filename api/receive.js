import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed"
    });
  }

  try {
    const data = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      ...req.body
    };

    // Save the POST data in Upstash
    await redis.rpush("messages", data);

    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Could not save data",
      error: error.message
    });
  }
}
