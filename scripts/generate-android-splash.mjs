import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resourcesRoot = path.join(projectRoot, "android", "app", "src", "main", "res");
const sizes = {
  drawable: [320, 480],
  "drawable-land-ldpi": [320, 240],
  "drawable-land-mdpi": [480, 320],
  "drawable-land-hdpi": [800, 480],
  "drawable-land-xhdpi": [1280, 720],
  "drawable-land-xxhdpi": [1600, 960],
  "drawable-land-xxxhdpi": [1920, 1280],
  "drawable-port-ldpi": [240, 320],
  "drawable-port-mdpi": [320, 480],
  "drawable-port-hdpi": [480, 800],
  "drawable-port-xhdpi": [720, 1280],
  "drawable-port-xxhdpi": [960, 1600],
  "drawable-port-xxxhdpi": [1280, 1920],
};

for (const [directory, dimensions] of Object.entries({ ...sizes })) {
  const nightDirectory =
    directory === "drawable"
      ? "drawable-night"
      : directory.startsWith("drawable-land-")
        ? directory.replace("drawable-land-", "drawable-land-night-")
        : directory.replace("drawable-port-", "drawable-port-night-");
  sizes[nightDirectory] = dimensions;
}

for (const [directory, [width, height]] of Object.entries(sizes)) {
  const file = path.join(resourcesRoot, directory, "splash.png");
  await mkdir(path.dirname(file), { recursive: true });
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#002B5C",
    },
  })
    .png()
    .toFile(file);
}

console.log(`Generated ${Object.keys(sizes).length} plain Android splash backgrounds.`);
