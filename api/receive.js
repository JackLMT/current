export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed"
    });
  }

  console.log("Received:", req.body);

  return res.status(200).json({
    success: true,
    message: "POST received successfully",
    data: req.body
  });
}
