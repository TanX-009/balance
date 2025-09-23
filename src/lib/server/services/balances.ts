import { db } from "../db";
import { balances, type TBalance, type TNewBalance } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createBalance(data: TNewBalance): Promise<TBalance> {
  const [row] = await db.insert(balances).values(data).returning();
  return row;
}

export async function getUserBalances(userId: string): Promise<TBalance[]> {
  const rows = await db
    .select()
    .from(balances)
    .where(eq(balances.ownerId, userId));

  const results: TBalance[] = [];
  for (let i = 0; i < rows.length; i++) {
    results.push(rows[i]);
  }
  return results;
}
