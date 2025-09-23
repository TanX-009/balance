import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  timestamp,
  pgEnum,
  uuid,
  varchar,
  json,
  decimal,
  unique,
  boolean,
} from "drizzle-orm/pg-core";

// ---------- USERS ----------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  age: integer("age"),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isDeleted: boolean("is_deleted").notNull().default(false), // soft delete
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------- SESSIONS ----------
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id), // RESTRICT on delete
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type TSession = typeof session.$inferSelect;

export type TUser = typeof user.$inferSelect;

// ---------- ENUMS ----------
export const entryTypeEnum = pgEnum("entry_type", ["debit", "credit"]);
export const balanceTypeEnum = pgEnum("balance_type", [
  "personal",
  "shared",
  "business",
  "loan",
  "investment",
]);
export const accountTypeEnum = pgEnum("account_type", [
  "asset", // bank, cash, wallets, receivables
  "liability", // loans, payables, credit cards
  "equity", // owner’s capital
  "income", // salary, sales, interest
  "expense", // rent, groceries, utilities
]);

// ---------- BALANCES ----------
export const balances = pgTable("balances", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  type: balanceTypeEnum("type").notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  ownerId: uuid("owner_id").notNull(), // FK to users table
  sharedWith: json("shared_with").$type<string[]>().default([]), // list of user_ids
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- TRANSACTIONS ----------
export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  reference: varchar("reference", { length: 100 }),
  notes: text("notes"),
  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- LEDGER ENTRIES ----------
export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id),

    balanceId: uuid("balance_id")
      .notNull()
      .references(() => balances.id),

    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id),

    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),

    type: entryTypeEnum("type").notNull(),
    amount: decimal("amount", { precision: 18, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // enforce uniqueness per transaction / balance / account
  (table) => {
    return [
      unique("ledger_entry_unique").on(
        table.transactionId,
        table.balanceId,
        table.accountId,
      ),
    ];
  },
);

// ---------- ACCOUNTS (underlying institutions) ----------
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // e.g. "ICICI Bank", "Groceries", "Salary"
  type: accountTypeEnum("type").notNull(),
  institution: varchar("institution", { length: 100 }), // optional: actual bank/provider
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }), // restrict, not cascade
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- TYPES ----------
export type TBalance = InferSelectModel<typeof balances>;
export type TNewBalance = InferInsertModel<typeof balances>;

export type TTransaction = InferSelectModel<typeof transactions>;
export type TNewTransaction = InferInsertModel<typeof transactions>;

export type TLedgerEntry = InferSelectModel<typeof ledgerEntries>;
export type TNewLedgerEntry = InferInsertModel<typeof ledgerEntries>;

export type TAccount = InferSelectModel<typeof accounts>;
export type TNewAccount = InferInsertModel<typeof accounts>;
