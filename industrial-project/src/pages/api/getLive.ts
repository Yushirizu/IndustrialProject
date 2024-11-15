import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default function getRelais(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Récupération des relais
		// db.relai.findMany().then((relais) => {
		// 	res.status(200).json(relais);
		// });

		// Envoyer la réponse avec les données
		res.status(200).json(res);
	} else {
		res.status(404).send("Not Found");
	}
}
