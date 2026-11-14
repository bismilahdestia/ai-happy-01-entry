// ai-happy-01 entry (Node 22, standard library only).
// The image beside this file, entry.png, is copied byte for byte to
// /output/entry.png. Before copying, the program checks the file is a
// real PNG and fits the gate: at most 1 MiB, at most 1024 by 1024 pixels,
// dimensions read from the IHDR chunk. A file that fails a check stops
// the run with an error instead of submitting something the gate
// would refuse. The copy is deterministic, so both grading runs write
// the identical bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

const buf = readFileSync(src);

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(sig)) {
  throw new Error('entry.png is not a PNG file');
}
if (buf.toString('ascii', 12, 16) !== 'IHDR') {
  throw new Error('entry.png has no IHDR chunk where a PNG should');
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate`);
}
if (buf.length > 1048576) {
  throw new Error(`entry.png is ${buf.length} bytes, over the 1 MiB gate`);
}
// A whole PNG ends with the 12-byte IEND chunk; a truncated file
// would fail the gate, so refuse it here instead of submitting it.
if (buf.toString('ascii', buf.length - 8, buf.length - 4) !== 'IEND') {
  throw new Error('entry.png has no IEND chunk, the file looks truncated');
}
writeFileSync(out, buf);
console.log(`wrote ${out} (${width}x${height}, ${buf.length} bytes)`);
