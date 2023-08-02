import React, { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "antd";
import style from "./resource.module.scss";

import { ListProps } from "./types";

const List: React.FC<ListProps> = ({
	items,
	resourceName,
	itemComponent: ItemComponent,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(query);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		setSearchParams(`?q=${value}`);
	};

	const filteredList = items.filter((listItem) =>
		listItem.subCategory.some((subcategory) =>
			subcategory.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	const handleOnClick = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<div className={style.container}>
			<div className={style.cardContainer}>
				<Input
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={handleSearchChange}
				/>
				{filteredList.map((item, i) => (
					<ItemComponent
						key={i}
						{...{ [resourceName]: item }}
						handleOnClick={handleOnClick}
					/>
				))}
			</div>
		</div>
	);
};

export default List;