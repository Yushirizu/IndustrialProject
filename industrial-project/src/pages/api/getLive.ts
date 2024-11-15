import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default function getRelais(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		db.live.findMany().then((msg) => {
			res.status(200).json(msg);
		});
		console.log("GET /api/getLive");
	} else {
		res.status(404).send("Not Found");
	}
}
