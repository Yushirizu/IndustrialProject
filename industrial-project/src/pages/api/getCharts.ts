import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function getCharts(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const historicData = await db.live.findMany({
			select: {
				EnergyConsumed: true,
			},
		});
		res.status(200).json(historicData);
		console.log(historicData);
	} else {
		res.status(404).send("Not Found");
	}
}
