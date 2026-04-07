import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Dynamic OG Image Generation
  app.get("/api/og", (req, res) => {
    const { title = "Hanif Portfolio", subtitle = "Software Engineer & Designer" } = req.query;
    
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#09090b"; // zinc-950
    ctx.fillRect(0, 0, width, height);

    // Gradient Accent
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(37, 99, 235, 0.1)"); // brand-600
    gradient.addColorStop(1, "rgba(79, 70, 229, 0.1)"); // indigo-600
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 40;
    ctx.strokeRect(0, 0, width, height);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    
    // Title
    ctx.font = "bold 80px sans-serif";
    const titleText = String(title);
    const words = titleText.split(' ');
    let line = '';
    let y = height / 2 - 20;
    const maxWidth = 1000;
    const lineHeight = 90;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);

    // Subtitle
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "#a1a1aa"; // zinc-400
    ctx.fillText(String(subtitle), width / 2, y + 80);

    // Brand
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "#2563eb"; // brand-600
    ctx.fillText("HANIF.DEV", width / 2, height - 80);

    const buffer = canvas.toBuffer("image/png");
    res.set("Content-Type", "image/png");
    res.send(buffer);
  });

  // Internal API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact Form Submission:", { name, email, message });
    
    // Simulate a successful API response
    res.status(200).json({ 
      success: true, 
      message: "Thank you for reaching out, Hanif! Your message has been received." 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
