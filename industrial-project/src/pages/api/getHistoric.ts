import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function gethistoric(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const historicData = await db.live.findMany();
		res.status(200).json(historicData);
	} else {
		res.status(404).send("Not Found");
	}
}
