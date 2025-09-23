import { db } from "../db";
import { ledgerEntries, type TLedgerEntry } from "../db/schema";
import { eq } from "drizzle-orm";

// Fetch ledger entries for a balance
export async function getLedgerForBalance(
  balanceId: string,
): Promise<TLedgerEntry[]> {
  const rows = await db
    .select()
    .from(ledgerEntries)
    .where(eq(ledgerEntries.balanceId, balanceId));
  const result: TLedgerEntry[] = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows[i]);
  }
  return result;
}

// Fetch ledger entries for a transaction
export async function getLedgerForTransaction(
  transactionId: string,
): Promise<TLedgerEntry[]> {
  const rows = await db
    .select()
    .from(ledgerEntries)
    .where(eq(ledgerEntries.transactionId, transactionId));
  const result: TLedgerEntry[] = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows[i]);
  }
  return result;
}
