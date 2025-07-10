import {
  OmitKeyof,
  QueryClient,
  QueryFunction,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import React, { Suspense } from "react";

type AwaitQueryProps<T> = {
  queryClient?: QueryClient;
  queryOption: OmitKeyof<UseQueryOptions<T, Error, T, string[]>, "queryFn"> & {
    queryFn?: QueryFunction<T, string[], never>;
  };
  children: ({
    data,
    invalidate,
  }: {
    data?: UseSuspenseQueryResult<T, Error> | null;
    invalidate?: () => void;
  }) => React.ReactNode;
  fallback?: React.ReactNode;
};

const Promise = <T,>({
  children,
  queryOption,
  queryClient,
}: AwaitQueryProps<T>) => {
  const data = useSuspenseQuery(queryOption);

  const invalidate = () => {
    return queryClient?.invalidateQueries({ queryKey: queryOption.queryKey });
  };

  return children({
    data,
    invalidate,
  });
};

const AwaitQuery = <T,>({ fallback, ...props }: AwaitQueryProps<T>) => {
  return (
    <Suspense fallback={fallback || props.children({ data: null })}>
      <Promise {...props} />
    </Suspense>
  );
};

export default AwaitQuery;
