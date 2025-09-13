import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  // Dummy balances for sidebar
  const balances = [
    { id: "1", name: "Personal Wallet" },
    { id: "2", name: "Shared Account" },
    { id: "3", name: "Business Funds" },
  ];

  const currentBalance = balances.find((b) => b.id === params.id);

  if (!currentBalance) {
    throw new Error("Balance not found"); // later -> 404
  }

  return { balances, currentBalance };
};
