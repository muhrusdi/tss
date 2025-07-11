import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AwaitQuery from "./await-query";
import { ClientOnly, useRouteContext } from "@tanstack/react-router";
import { newCustomerOption, totalRevenueQueryOption } from "~/lib/queries";
import { LoaderCircle, SplineIcon } from "lucide-react";
import clsx from "clsx";

export function SectionCards() {
  const queryClient = useRouteContext({
    from: "/",
    select: (c) => c.queryClient,
  });

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <AwaitQuery
        queryClient={queryClient}
        queryOption={totalRevenueQueryOption}
      >
        {({ data, invalidate }) => (
          <Card
            className={clsx(
              "@container/card",
              !data?.data ? "[&>*]:blur-sm" : ""
            )}
          >
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.data.price || 0}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                <div className="flex justify-between items-center gap-2">
                  <div>Visitors for the last 6 months</div>
                  <div>
                    <ClientOnly>
                      <button
                        onClick={invalidate}
                        className="cursor-pointer flex"
                      >
                        <div
                          className={data?.isRefetching ? "animate-spin" : ""}
                        >
                          <LoaderCircle size={14} />
                        </div>
                      </button>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </AwaitQuery>
      <AwaitQuery queryClient={queryClient} queryOption={newCustomerOption}>
        {({ data, invalidate }) => (
          <Card
            className={clsx(
              "@container/card",
              !data?.data ? "[&>*]:blur-sm" : ""
            )}
          >
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data?.data.price || 0}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                <div className="flex justify-between items-center gap-2">
                  <div>Visitors for the last 6 months</div>
                  <div>
                    <ClientOnly>
                      <button
                        onClick={invalidate}
                        className="cursor-pointer flex"
                      >
                        <div className={data?.isFetching ? "animate-spin" : ""}>
                          <LoaderCircle size={14} />
                        </div>
                      </button>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        )}
      </AwaitQuery>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
