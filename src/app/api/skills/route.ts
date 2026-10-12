// DO NOT MODIFY.

import { delay } from "../_lib/delay";
import skills from "../_fixtures/skills.json";

export const dynamic = "force-dynamic";

export async function GET() {
  await delay();
  return Response.json(skills);
}
