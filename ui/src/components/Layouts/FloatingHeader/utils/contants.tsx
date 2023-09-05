import { MenuProps } from "antd";
import { Link } from "react-router-dom";

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

export { items };