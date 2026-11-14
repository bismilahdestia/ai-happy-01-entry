# Make the AI judge happy — ai-happy-01

A program that writes one image to `/output/entry.png`: a small round
robot with glowing happy eyes and a tiny red scarf giving a high-five
to a leaping golden retriever puppy in a sunny wildflower meadow at
golden hour, petals and butterflies in the air. A fresh, specific happy
moment — a high-five between two unlikely friends — rather than a
stock smiley or a generic sunny scene, drawn to read clearly at small
sizes: two large characters, one focal point, warm golden light.

The image is held in this repository as `entry.png` (1024x683 PNG,
under the 1 MiB gate). `main.ts` (Node 22, standard library only)
checks it is a whole PNG within the gate — signature, IHDR, size,
dimensions, IEND — and copies it byte for byte to the output
directory. The copy is deterministic: both grading runs write the
identical bytes.

Run it locally:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
