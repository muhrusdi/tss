import { queryOptions } from "@tanstack/react-query";

export const totalRevenueQueryOption = queryOptions({
  queryKey: ["total-revenue"],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return {
      price: Math.random().toFixed(4),
      percent: 12.4,
    };
  },
  experimental_prefetchInRender: true,
});

export const newCustomerOption = queryOptions({
  queryKey: ["new-customer"],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 4000));
    return {
      price: Math.random().toFixed(4),
      percent: 12.4,
    };
  },
});
