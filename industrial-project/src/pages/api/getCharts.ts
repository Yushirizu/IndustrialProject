import { db } from "~/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { time } from "console";

export default async function getCharts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const historicData = await db.historicalData.findMany({
        select: {
          EnergyConsumed: true,
          FeedCapCarre: true,
          FeedCapRound: true,
          id: true,
		  timestamp: true,
        },
      });
      res.status(200).json(historicData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(404).send("Not Found");
  }
}