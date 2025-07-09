import { Await, createFileRoute } from "@tanstack/react-router";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { data as _data, chartData } from "~/utils/users";
import { postLoader } from "~/utils/posts";

export const Route = createFileRoute("/")({
  component: Home,
  // loaderDeps: ({ search: { last } }) => ({ last }),
  loader: async () => {
    const deferredPost = postLoader();

    return { deferredPost, data: _data, chartData: chartData };
  },
  gcTime: 0,
  // Only reload the route when the user navigates to it or when deps change
  shouldReload: false,
});

function Home() {
  const { deferredPost, data, chartData } = Route.useLoaderData();

  return (
    <div>
      <SiteHeader />
      <Await promise={deferredPost} fallback={<div>Loading...</div>}>
        {(data) => <div id="__id">{data.length}</div>}
      </Await>
      <Await promise={deferredPost} fallback={<div>Loading...</div>}>
        {(data) => <div>{data.length}</div>}
      </Await>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive chartData={chartData} />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
