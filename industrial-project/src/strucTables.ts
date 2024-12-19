import { GridColDef } from "@mui/x-data-grid";

export const tableLive: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 100, align: "center", headerAlign: "center" },
	{
		field: "timestamp",
		headerName: "Timestamp",
		width: 200,
		align: "center",
		headerAlign: "center",
		valueFormatter: () => {
			const date = new Date();
			return date.toLocaleString();
		}
	},
	{ field: "volt", headerName: "Volt", width: 200, align: "center", headerAlign: "center" },
	{ field: "air", headerName: "Air consumption", width: 100, align: "center", headerAlign: "center" },
	{ field: "current", headerName: "Current", width: 200, align: "center", headerAlign: "center" },
	{ field: "ActivePower", headerName: "ActivePower", width: 100, align: "center", headerAlign: "center" },
	{ field: "PowerFactor", headerName: "PowerFactor", width: 200, align: "center", headerAlign: "center" },
	{ field: "EnergyConsumed", headerName: "EnergyConsumed", width: 100, align: "center", headerAlign: "center" },
	{ field: "FeedCapCarre", headerName: "FeedCapCarre", width: 125, align: "center", headerAlign: "center" },
	{ field: "FeedCapRound", headerName: "FeedCapRound", width: 125, align: "center", headerAlign: "center" },
];
