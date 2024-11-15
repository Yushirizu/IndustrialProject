import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default function getRelais(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Récupération des relais
		// db.relai.findMany().then((relais) => {
		// 	res.status(200).json(relais);
		// });
		console.log("GET /api/getLive");
	} else {
		res.status(404).send("Not Found");
	}
}
