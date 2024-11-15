import { GridColDef } from "@mui/x-data-grid";

export const tableLive: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50 },
	{ field: "volt", headerName: "Volt", width: 50 },
	{ field: "air", headerName: "Air consumption", width: 50 },
	{ field: "current", headerName: "Current", width: 50 },
	{ field: "ActivePower", headerName: "ActivePower", width: 50 },
	{ field: "PowerFactor", headerName: "PowerFactor", width: 50 },
	{ field: "EnergyConsumed", headerName: "EnergyConsumed", width: 50 },
	{ field: "FeedCapCarre", headerName: "FeedCapCarre", width: 50 },
	{ field: "FeedCapRound", headerName: "FeedCapRound", width: 50 },
];