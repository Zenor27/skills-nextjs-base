// DO NOT MODIFY.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { delay } from "../_lib/delay";

export const dynamic = "force-dynamic";

type Cart = { skillIds: number[] };

const CART_FILE = join(process.cwd(), ".data", "cart.json");
const EMPTY_CART: Cart = { skillIds: [] };

function isCart(value: unknown): value is Cart {
  if (typeof value !== "object" || value === null) return false;
  const { skillIds } = value as { skillIds?: unknown };
  return (
    Array.isArray(skillIds) &&
    skillIds.every((id) => typeof id === "number" && Number.isFinite(id))
  );
}

function readCart(): Cart {
  try {
    const parsed: unknown = JSON.parse(readFileSync(CART_FILE, "utf8"));
    return isCart(parsed) ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function writeCart(cart: Cart): void {
  mkdirSync(dirname(CART_FILE), { recursive: true });
  writeFileSync(CART_FILE, JSON.stringify(cart), "utf8");
}

export async function GET() {
  await delay();
  return Response.json(readCart());
}

export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }

  if (!isCart(body)) {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  writeCart(body);
  await delay();
  return Response.json(body);
}
