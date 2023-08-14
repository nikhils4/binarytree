import { MenuProps } from "antd";
import { IconComponentType } from "./constant";

type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
	label: React.ReactNode,
	key: React.Key,
	IconComponent?: IconComponentType,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon: IconComponent ? <IconComponent size={16} /> : undefined,
		children,
		label,
		type,
	} as MenuItem;
}