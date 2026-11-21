import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apkPath = path.join(
  projectRoot,
  "android",
  "app",
  "build",
  "outputs",
  "apk",
  "debug",
  "app-debug.apk",
);
const installerDirectory = path.join(projectRoot, "instaladores");

await mkdir(installerDirectory, { recursive: true });
await copyFile(apkPath, path.join(installerDirectory, "Sistema Parroquial Android.apk"));
