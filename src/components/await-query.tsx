import {
  QueryClient,
  type QueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import React, { Suspense } from "react";

type ChildrenType = {
  data: any;
  invalidate?: () => Promise<void>;
};

type PromiseProps = {
  children: (props: ChildrenType) => React.ReactNode;
  queryOption: () => QueryOptions<any, Error, any, string[]>;
  queryClient: QueryClient;
  fallback?: React.ReactNode;
};

const Promise = ({ children, queryOption, queryClient }: PromiseProps) => {
  const qOpt = queryOption();
  const data = useSuspenseQuery(qOpt as UseSuspenseQueryOptions);

  const invalidate = () => {
    return queryClient.invalidateQueries({ queryKey: qOpt.queryKey });
  };

  return children({ data, invalidate });
};

const AwaitQuery = ({ fallback, ...props }: PromiseProps) => {
  return (
    <Suspense fallback={fallback || props.children({ data: null })}>
      <Promise {...props} />
    </Suspense>
  );
};

export default AwaitQuery;
