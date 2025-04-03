import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsletterRoute from "./routes/newsletterRoutes";
import categoryRoute from "./routes/category";
import blogRoute from "./routes/blog";
import contactRoute from "./routes/contact";
import connectToDB from "./utils/database";

dotenv.config({ path: "./.env" });

const app = express();

// Define allowed origins
const allowedOrigins: string[] = [
  process.env.WOUESSI_FRONTEND_URL!,
  "https://dev.wouessi.com/en",
  "https://dev.wouessi.com",
  "https://www.wouessi.com/en",
  "https://www.wouessi.com",
  "https://www.wouessi.ca/en/",
  "https://www.wouessi.ca",
];

app.use(
  cors({
    origin: (origin: string | undefined, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation"), false);
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API routes
app.use("/api/newsletter", newsletterRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/contact", contactRoute);

// Base routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Wouessi Back Office");
});

app.get("/data", (req: Request, res: Response) => {
  res.json({ message: "Hello from the server!" });
});

// Initialize the application
const initializeApp = async () => {
  try {
    await connectToDB(process.env.MONGODB_NAME!);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
};

// Start the application
initializeApp();

export default app; // Export for testing purposes
