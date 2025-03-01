import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function verifyUser(...allowedRoles) {
  console.log("Verifying user...");
  return (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ Error: "You are not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(403).json({ Error: "Token is not valid" });
      }

      if (decoded.email && decoded.role) {
        // Check if the user's role is allowed
        if (
          !allowedRoles
            .map((role) => role.toLowerCase())
            .includes(decoded.role.toLowerCase())
        ) {
          return res.status(403).json({ Error: "Forbidden" });
        }

        // Attach email and role to the request object
        req.email = decoded.email;
        req.role = decoded.role;
        req.user = decoded; // Attach full decoded user data

        next();
      } else {
        return res.status(403).json({ Error: "Invalid token payload" });
      }
    });
  };
}

export default verifyUser;
