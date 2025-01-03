import {GridColDef} from "@mui/x-data-grid";

export const tableLive: GridColDef[] = [{
    field: "id", headerName: "ID", width: 100, align: "center", headerAlign: "center"
}, {
    field: "timestamp",
    headerName: "Timestamp",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => new Date(params.value as string).toLocaleTimeString(),
    
}, {field: "volt", headerName: "Volt", width: 200, align: "center", headerAlign: "center"}, {
    field: "air", headerName: "Air consumption", width: 100, align: "center", headerAlign: "center"
}, {field: "current", headerName: "Current", width: 200, align: "center", headerAlign: "center"}, {
    field: "ActivePower", headerName: "ActivePower", width: 100, align: "center", headerAlign: "center"
}, {
    field: "PowerFactor", headerName: "PowerFactor", width: 200, align: "center", headerAlign: "center"
}, {
    field: "EnergyConsumed", headerName: "EnergyConsumed", width: 100, align: "center", headerAlign: "center"
}, {
    field: "FeedCapCarre", headerName: "FeedCapCarre", width: 125, align: "center", headerAlign: "center"
}, {field: "FeedCapRound", headerName: "FeedCapRound", width: 125, align: "center", headerAlign: "center"},];
