export default function handler(req, res) {
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'OTHER_KEY'];
  const missingVars = requiredVars.filter(v => !process.env[v]);

  if (missingVars.length > 0) {
    return res.status(500).json({
      success: false,
      message: 'Missing environment variables',
      missing: missingVars,
    });
  }

  res.status(200).json({
    success: true,
    message: 'All required environment variables are set!',
  });
}
