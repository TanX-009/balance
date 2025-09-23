import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  // fake data for now
  const ledgers = [
    { id: "1", name: "Personal" },
    { id: "2", name: "Business" },
  ];

  const ledger = ledgers.find((l) => l.id === params.id) ?? ledgers[0];

  return { ledger, ledgers };
};
