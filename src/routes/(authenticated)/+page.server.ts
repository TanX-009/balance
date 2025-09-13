import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const balances = [
    { id: "1", name: "Personal Wallet" },
    { id: "2", name: "Shared Account" },
    { id: "3", name: "Business Funds" },
  ];
  return { user, balances };
};
