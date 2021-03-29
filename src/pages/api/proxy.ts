import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = req.query.url as string;
    const data = await fetchData(url);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export async function fetchData(url: string) {
  console.log("Requesting... ", url);
  const data = await fetch(url);
  const json = await data.json();
  return json;
}
