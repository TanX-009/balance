import { db } from "../db";
import { eq } from "drizzle-orm";
import {
  ledgerEntries,
  transactions,
  type TLedgerEntry,
  type TNewLedgerEntry,
  type TNewTransaction,
  type TTransaction,
} from "../db/schema";

export type TTransactionEntry = {
  balanceId: string;
  type: "debit" | "credit";
  amount: number | string;
  currency: string;
  accountId: string;
  description?: string;
  userId: string;
};

export async function recordTransaction(
  data: Omit<TNewTransaction, "id" | "createdAt">,
  entries: TTransactionEntry[],
): Promise<{ transaction: TTransaction; ledger: TLedgerEntry[] }> {
  return db.transaction(async (tx) => {
    // 1 Insert transaction
    const [txn] = await tx.insert(transactions).values(data).returning();

    // 2 Validate double-entry
    let debitSum = 0;
    let creditSum = 0;
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const amt = Number(e.amount);
      if (e.type === "debit") debitSum += amt;
      else creditSum += amt;
    }

    if (debitSum !== creditSum) {
      throw new Error("Transaction is not balanced: debit != credit");
    }

    // 3 Insert ledger entries
    const ledgerRows: TNewLedgerEntry[] = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      ledgerRows.push({
        transactionId: txn.id,
        balanceId: e.balanceId,
        accountId: e.accountId,
        userId: e.userId,
        type: e.type,
        amount: e.amount.toString(),
        currency: e.currency,
        description: e.description ?? null,
      });
    }

    const insertedLedger = await tx
      .insert(ledgerEntries)
      .values(ledgerRows)
      .returning();

    return { transaction: txn, ledger: insertedLedger };
  });
}

export async function getTransactionsByUser(
  userId: string,
): Promise<TTransaction[]> {
  const rows = await db
    .select()
    .from(transactions)
    .where(eq(transactions.createdBy, userId));

  const results: TTransaction[] = [];
  for (let i = 0; i < rows.length; i++) {
    results.push(rows[i]);
  }
  return results;
}
