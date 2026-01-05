import qs from "qs";
import useSWR from "swr";
import { SubscriptionProps } from "../types";
import { fetcher } from "../lib/fetcher";

const useSubscriptions = (params?: unknown) => {
  const queryString = qs.stringify(params, { skipNulls: true });
  const { data, error } = useSWR<SubscriptionProps[]>(
    `/subscriptions?${queryString}`,
    fetcher
  );

  const isFetching = !data && !error;

  return { subscriptions: data ?? [], isFetching, error };
};

export default useSubscriptions;
