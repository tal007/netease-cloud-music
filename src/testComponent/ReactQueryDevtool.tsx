import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function ReactQueryDevtool() {
  return <Example />;
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery<
    {
      name: string;
      description: string;
      subscribers_count: number;
      stargazers_count: number;
      forks_count: number;
    },
    Error
  >("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <div>"Loading..."</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👀 {data?.subscribers_count}</strong>{" "}
      <strong>✨ {data?.stargazers_count}</strong>{" "}
      <strong>🍴 {data?.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
