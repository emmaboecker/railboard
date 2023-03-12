import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getBaseUrl } from "../../server/base-url";
import { redis } from "../../server/redis";

export const Share = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("station"),
    eva: z.string(),
    timestamp: z.number().int().optional(),
  }),
  z.object({
    type: z.literal("journey"),
    journeyId: z.string(),
  }),
]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.end(405);
  }

  const result = Share.safeParse(req.body);
  if (!result.success) {
    const formatted = result.error.format();
    return res.status(400).json(formatted);
  }

  const share = result.data;

  const id = generateShareId();
  const shareData = {
    id,
    ...share,
  };
  await redis.setex(id, 60 * 60 * 24 * 30 /* one month */, shareData);

  const baseUrl = getBaseUrl(true, req.headers.host);

  return res.status(200).json({
    url: `${baseUrl}/s/${id}`,
  });
}

const nanoid = customAlphabet(alphanumeric);

function generateShareId() {
  return nanoid(10);
}
