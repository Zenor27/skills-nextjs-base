// DO NOT MODIFY.

const MIN_MS = 200;
const MAX_MS = 1500;

/** Waits a uniformly random duration between 200 and 1500 ms. */
export async function delay(): Promise<void> {
  const ms = MIN_MS + Math.floor(Math.random() * (MAX_MS - MIN_MS + 1));
  await new Promise((r) => setTimeout(r, ms));
}
