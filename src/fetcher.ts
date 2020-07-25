import fetch from "isomorphic-unfetch";

export async function fetcher(...args: any[]) {
  // @ts-ignore
  const res = await fetch(...args);
  return res.json();
}
