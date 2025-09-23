import { db } from "../db";
import { accounts, type TAccount, type TNewAccount } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createAccount(data: TNewAccount): Promise<TAccount> {
  const [row] = await db.insert(accounts).values(data).returning();
  return row;
}

export async function getUserAccounts(userId: string): Promise<TAccount[]> {
  const rows = await db
    .select()
    .from(accounts)
    .where(eq(accounts.ownerId, userId));

  const results: TAccount[] = [];
  for (let i = 0; i < rows.length; i++) {
    results.push(rows[i]);
  }
  return results;
}
