// middlewares/rateLimiter.js
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later!",
      });
    }

    // If successful, continue to the next middleware/handler
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    res.status(500).json({ message: "Internal Server Error (rate limit)" });
  }
};

export default rateLimiter;
