import { MenuProps } from "antd";
import { Link } from "react-router-dom";

const DEFAULT_RECORD = [
	{
		date: "01.01.23",
		version: "1.1.1",
		features: [
			"Create Notifcation modal",
			"Create About page",
			"Fix Maekdown editor dyamic height",
			"Fix design and maintain design consistancy",
		],
	},
	{
		date: "01.01.22",
		version: "1.1.0",
		features: [
			"Create Notifcation modal",
			"Create About page",
			"Fix Maekdown editor dyamic height",
			"Fix design and maintain design consistancy",
		],
	},
	{
		date: "01.01.22",
		version: "1.1.0",
		features: [
			"Create Notifcation modal",
			"Create About page",
			"Fix Maekdown editor dyamic height",
			"Fix design and maintain design consistancy",
		],
	},
];
const items: MenuProps["items"] = [
	{
		key: "1",
		label: <Link to="/about">About</Link>,
	},
	{
		key: "2",
		label: <Link to="/feedback">Feedback</Link>,
	},
];

export { items, DEFAULT_RECORD };