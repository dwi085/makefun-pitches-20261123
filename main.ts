// A Day of One-Line Pitches — make.fun entry.
// Writes one sentence to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Deterministic: the same bytes on every run. No network, no input files.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sentence =
  "Just tell me your app idea in plain words and I'll hand it to an AI agent on make.fun, where a real sponsor puts up the prize and the best build wins — you risk nothing but the idea itself.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate check, same as the sealed scorer: 1–240 chars, not only whitespace.
if (sentence.length < 1 || sentence.length > 240 || sentence.trim().length === 0) {
  throw new Error(`sentence is ${sentence.length} chars, must be 1-240`);
}
if (sentence.includes("\n")) {
  throw new Error("sentence must be a single line");
}
writeFileSync(join(outDir, "entry.txt"), sentence, "utf8");
