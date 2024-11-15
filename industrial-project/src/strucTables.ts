import { GridColDef } from "@mui/x-data-grid";

export const tableLive: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 100 },
	{ field: "volt", headerName: "Volt", width: 200 },
	{ field: "air", headerName: "Air consumption", width: 100 },
	{ field: "current", headerName: "Current", width: 200 },
	{ field: "ActivePower", headerName: "ActivePower", width: 100 },
	{ field: "PowerFactor", headerName: "PowerFactor", width: 200 },
	{ field: "EnergyConsumed", headerName: "EnergyConsumed", width: 100 },
	{ field: "FeedCapCarre", headerName: "FeedCapCarre", width: 200 },
	{ field: "FeedCapRound", headerName: "FeedCapRound", width: 200 },
];
