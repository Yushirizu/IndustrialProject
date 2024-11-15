import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function getLive(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			// Récupérez les données de la base de données
			const liveData = await db.live.findMany();

			// Envoyez les données dans la réponse
			res.status(200).json(liveData);
			console.log("Données en direct:", liveData);
		} catch (error) {
			console.error("Erreur lors de la récupération des données:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des données" });
		}
	} else {
		res.status(404).send("Not Found");
	}
}
