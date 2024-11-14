import * as React from "react";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";

const useStyles = makeStyles({
	formControl: {
		margin: "20px",
		padding: "20px",
		border: "1px solid #ccc",
		borderRadius: "8px",
	},
	formLabel: {
		marginBottom: "10px",
		fontSize: "1.2em",
	},
	formGroup: {
		display: "flex",
		flexDirection: "column",
	},
	formControlLabel: {
		display: "flex",
		alignItems: "center",
		marginBottom: "10px",
	},
	trafficLight: {
		width: "20px",
		height: "20px",
		borderRadius: "50%",
		marginLeft: "10px",
	},
	greenLight: {
		backgroundColor: "green",
	},
	redLight: {
		backgroundColor: "red",
	},
});

function TrafficLight({ isActive }: { isActive: boolean }) {
	const classes = useStyles();
	return (
		<div
			className={`${classes.trafficLight} ${
				isActive ? classes.greenLight : classes.redLight
			}`}
		></div>
	);
}

export default function SwitchesGroup() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		gilad: true,
		jason: false,
		antoine: true,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
	};

	return (
		<FormControl
			component="fieldset"
			variant="standard"
			className={classes.formControl}
		>
			<FormLabel
				component="legend"
				className={classes.formLabel}
			>
				Assign responsibility
			</FormLabel>
			<FormGroup className={classes.formGroup}>
				<div className={classes.formControlLabel}>
					<FormControlLabel
						control={
							<Switch
								checked={state.gilad}
								onChange={handleChange}
								name="gilad"
							/>
						}
						label="Gilad Gray"
					/>
					<TrafficLight isActive={state.gilad} />
				</div>
				<div className={classes.formControlLabel}>
					<FormControlLabel
						control={
							<Switch
								checked={state.jason}
								onChange={handleChange}
								name="jason"
							/>
						}
						label="Jason Killian"
					/>
					<TrafficLight isActive={state.jason} />
				</div>
				<div className={classes.formControlLabel}>
					<FormControlLabel
						control={
							<Switch
								checked={state.antoine}
								onChange={handleChange}
								name="antoine"
							/>
						}
						label="Antoine Llorca"
					/>
					<TrafficLight isActive={state.antoine} />
				</div>
			</FormGroup>
			<FormHelperText>
				Be sure to assign responsibilities correctly.
			</FormHelperText>
		</FormControl>
	);
}
