
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Only POST requests are allowed"
    });
  }

  try {
    const data = req.body;

    console.log("Received from SIM800L:", data);

    return res.status(200).json({
      success: true,
      message: "Data received",
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
