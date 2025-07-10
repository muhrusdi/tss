import {
  Await,
  createFileRoute,
  useRouteContext,
} from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

const deferredQueryOptions1 = () =>
  queryOptions({
    queryKey: ["deferred1"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return {
        message: `Hello deferred from the server!`,
        status: "success",
        time: new Date(),
      };
    },
  });

const deferredQueryOptions2 = () =>
  queryOptions({
    queryKey: ["deferred2"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 4000));
      return {
        message: `Hello deferred from the server!`,
        status: "success",
        time: new Date(),
      };
    },
  });

export const Route = createFileRoute("/deferred")({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(deferredQueryOptions1());
    context.queryClient.prefetchQuery(deferredQueryOptions2());

    return { dataServer: 1 };
  },
  component: Deferred,
});

function Deferred() {
  const [count, setCount] = useState(0);

  const { dataServer } = Route.useLoaderData();

  const queryClient = useRouteContext({
    from: "/deferred",
    select: (c) => c.queryClient,
  });

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["deferred1"] });
  };
  const handleRefetch2 = () => {
    queryClient.invalidateQueries({ queryKey: ["deferred2"] });
  };

  return (
    <div className="p-2">
      <Suspense
        fallback={<div className="border p-4 mt-2 relative">Loaidng...</div>}
      >
        <DeferredQuery1 />
      </Suspense>
      <Suspense
        fallback={<div className="border p-4 mt-2 relative">Loaidng...</div>}
      >
        <DeferredQuery2 />
      </Suspense>
      <div>Count: {count}</div>
      <div>Count Server: {dataServer}</div>
      <div className="gap-2 flex">
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={handleRefetch}>Refetch</button>
        <button onClick={handleRefetch2}>Refetch2</button>
      </div>
    </div>
  );
}

function DeferredQuery1() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions1());

  const isLoading = deferredQuery.isFetching;

  return (
    <div className="border p-4 mt-2 relative">
      <div className={isLoading ? "blur-sm" : ""}>
        <h1>Deferred Query 1</h1>
        <div>Status: {deferredQuery.data.status}</div>
        <div>Message: {deferredQuery.data.message}</div>
        <div>Time: {deferredQuery.data.time.toISOString()}</div>
      </div>
      {isLoading ? (
        <div className="animate-spin absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-circle-icon lucide-loader-circle"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

function DeferredQuery2() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions2());

  const isLoading = deferredQuery.isFetching;

  return (
    <div className="border p-4 mt-2 relative">
      <div className={isLoading ? "blur-sm" : ""}>
        <h1>Deferred Query 2</h1>
        <div>Status: {deferredQuery.data.status}</div>
        <div>Message: {deferredQuery.data.message}</div>
        <div>Time: {deferredQuery.data.time.toISOString()}</div>
      </div>
      {isLoading ? (
        <div className="animate-spin absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-circle-icon lucide-loader-circle"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
