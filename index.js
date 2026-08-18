export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed"
    });
  }

  const data = req.body;

  console.log("Received:", data);

  return res.status(200).json({
    success: true,
    message: "POST received successfully",
    data: data
  });
}
