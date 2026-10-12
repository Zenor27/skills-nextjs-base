// DO NOT MODIFY.

import categories from "../_fixtures/categories.json";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(categories);
}
