import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "hafas-client";
import { profile as dbProfile } from "hafas-client/p/db/index";
import { z } from "zod";

const client = createClient(dbProfile, "RailBoard");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q, date } = req.query;

  const query = z.string().safeParse(q);

  const parsedDate = z.string().safeParse(date);

  if (!parsedDate.success) {
    res.status(400).json({ error: "Invalid date" });
    return;
  }

  const numberDate = parseInt(parsedDate.data);

  if (!query.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }

  if (typeof client.tripsByName !== "function") {
    res.status(500).json({ error: "Not implemented" }); // This is so weird, javascript is so weird
    return;
  }

  try {
    const date = new Date(numberDate);
    const trips = await client.tripsByName(query.data, {
      when: date,
    });

    res.status(200).json(trips);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
