import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://app.vendo.noncd.db.de/mob/location/search",
    {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/x.db.vendo.mob.location.v3+json",
        Accept: "application/x.db.vendo.mob.location.v3+json",
        "X-Correlation-ID": "ratio",
      },
    }
  );

  const json = await response.json();

  res.json(json);
}
