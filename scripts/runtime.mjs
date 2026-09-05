import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.resolve(__dirname, "../build");
const port = Number(process.env.PORT ?? 3000);
const envFilePath = path.resolve(process.cwd(), process.env.ENV_FILE_PATH ?? ".env.local");

const parseEnvFile = async (filePath) => {
  try {
    const content = await readFile(filePath, "utf8");
    const env = {};

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");

      if (separator === -1) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      let value = trimmed.slice(separator + 1).trim();

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      }

      env[key] = value;
    }

    return env;
  } catch {
    return {};
  }
};

const fileEnv = await parseEnvFile(envFilePath);
const runtimeEnv = {
  NEXT_PUBLIC_API_URL: String(fileEnv.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001"),
};

await mkdir(buildDir, { recursive: true });
await writeFile(path.join(buildDir, "env.js"), `window.__ENV__ = ${JSON.stringify(runtimeEnv)};\n`);

const contentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  return (
    {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".ico": "image/x-icon",
      ".txt": "text/plain; charset=utf-8",
      ".map": "application/json; charset=utf-8",
    }[ext] ?? "application/octet-stream"
  );
};

const resolvePath = async (requestPath) => {
  const cleanPath = decodeURIComponent(requestPath.split("?")[0]).replace(/^\/+/, "");
  const candidates = [];

  if (!cleanPath) {
    candidates.push("index.html");
  } else {
    candidates.push(cleanPath);

    if (!path.extname(cleanPath)) {
      candidates.push(path.join(cleanPath, "index.html"));
      candidates.push(`${cleanPath}.html`);
    }
  }

  candidates.push("index.html");

  for (const candidate of candidates) {
    const filePath = path.join(buildDir, candidate);

    try {
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        return filePath;
      }
    } catch {
      // Ignore and try next candidate.
    }
  }

  return path.join(buildDir, "index.html");
};

const server = createServer(async (req, res) => {
  try {
    const requestPath = req.url ?? "/";

    if (requestPath === "/env.js") {
      const envJs = await readFile(path.join(buildDir, "env.js"));
      res.writeHead(200, { "Content-Type": "application/javascript; charset=utf-8" });
      res.end(envJs);
      return;
    }

    const filePath = await resolvePath(requestPath);
    const body = await readFile(filePath);

    res.writeHead(200, {
      "Content-Type": contentType(filePath),
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(error instanceof Error ? error.message : "Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Web server running at http://0.0.0.0:${port}`);
});
