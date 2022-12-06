import {NextApiRequest, NextApiResponse} from "next";
import {createClient} from 'hafas-client';
import {profile as dbProfile} from "hafas-client/p/db";

const client = createClient(dbProfile, "RailBoard")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {q} = req.query
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await client.tripsByName(q, {
      when: new Date()
    })
    const allTrips = response.trips
    const distinctTrips = allTrips.filter((value, index, self) => {
      const otherIndex = self.findIndex((it) => it.line?.fahrtNr == value.line?.fahrtNr)
      return index == otherIndex
    })
    res.json(distinctTrips);
  } catch (ex) {
    console.error(ex);
    res.json([])
  }
}

