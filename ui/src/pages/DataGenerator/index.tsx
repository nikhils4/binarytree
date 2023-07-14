import { downloadTextFile } from "utils/utils";
import { useState } from "react";
import style from "./DataGenerator.module.scss";
import { FAKER_DATA_TYPES, MYSQL_DATA_TYPES } from "./utils/constants";
import { Button, Input, InputNumber, Select, AutoComplete, Space } from "antd";
import { useClipboard } from "@mantine/hooks";
import { convertToJSON } from "./utils/utils";

const { TextArea } = Input;

const DataGenerator: React.FC = () => {
	const [tableName, setTableName] = useState("");
	const [result, setResult] = useState("");
	const [colNum, setColNum] = useState(0);
	const [rowNum, setRowNum] = useState(0);
	const [colNames, setColNames] = useState<string[]>([]);
	const [dataTypes, setDataTypes] = useState<string[]>([]);
	const [fakeDataTypes, setFakeDataTypes] = useState<string[]>([]);

	const clipboard = useClipboard({ timeout: 500 });

	const onColNamesChange = (e: any, idx: number) => {
		setColNames((p: string[]) => [
			...p.slice(0, idx),
			e,
			...p.slice(idx + 1),
		]);
	};

	const onDataTypesChange = (e: any, idx: number) => {
		setDataTypes((p: string[]) => [
			...p.slice(0, idx),
			e,
			...p.slice(idx + 1),
		]);
	};

	const onFakeDataTypesChange = (e: any, idx: number) => {
		setFakeDataTypes((p: string[]) => [
			...p.slice(0, idx),
			e,
			...p.slice(idx + 1),
		]);
	};

	const onButtonClick = () => {
		let result = "";
		let allColName = colNames.join("`, `");
		let fakeDataMethods: any = [];
		let sqlTable = `CREATE TABLE \`${tableName}\` (\n`;

		for (let i = 0; i < colNames.length; i++) {
			sqlTable += `\`${colNames[i]}\` ${dataTypes[i]}\n`;
		}

		sqlTable += `) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;`;

		for (let j = 0; j < colNames.length; j++) {
			fakeDataMethods.push(
				FAKER_DATA_TYPES.find((faker, index) => {
					return faker.value === fakeDataTypes[j];
				})?.method
			);
		}

		for (let i = 0; i < rowNum; i++) {
			let fakeData: any = [];
			for (let j = 0; j < colNames.length; j++) {
				fakeData.push(fakeDataMethods[j]?.());
			}

			result += `INSERT INTO \`${tableName}\` (\`${allColName}\`) VALUES ('${fakeData.join(
				"', '"
			)}');\n`;
		}

		setResult(`${sqlTable}\n\n\n\n\n${result}`);
	};

	return (
		<div className={style.dg}>
			<div className={style.dg__left}>
				<div className={style.dg__left_top}>
					<Input
						placeholder="Table name"
						value={tableName}
						onChange={(event) => setTableName(event.currentTarget.value)}
						autoComplete="nope"
					/>
					<InputNumber
						
						placeholder="NumberInput with custom layout"
						value={colNum}
						min={0}
						onChange={(val: any) => {
							setColNum(val);
							setColNames((p: string[]) => [...p.slice(0, val)]);
							setDataTypes((p: string[]) => [...p.slice(0, val)]);
							setFakeDataTypes((p: string[]) => [
								...p.slice(0, val),
							]);
						}}
					/>
					<InputNumber	
						placeholder="NumberInput with custom layout"
						value={rowNum}
						min={0}
						onChange={(val: any) => setRowNum(val)}
					/>
				</div>

				<div className={style.dg__left_bottom}>
					{/* Fix the warning */}
					<div>
						{Array.from({ length: colNum }, (_, k) => (
							<AutoComplete
								key={`faker-data-type-${k}`}
								value={
									fakeDataTypes[k] === undefined
										? (fakeDataTypes[k] = "")
										: fakeDataTypes[k]
								}
								placeholder="Pick one"
								options={FAKER_DATA_TYPES}
								onChange={(e: any) => {
									onFakeDataTypesChange(e, k);
									// how to handle this better?
									// if (colNames[k] === "")
									onColNamesChange(e, k);
								}}
							/>
						))}
					</div>
					<div>
						{Array.from({ length: colNum }, (_, k) => (
							<Select
								key={`data-type-${k}`}
								placeholder="Data type"
								value={
									dataTypes[k] === undefined
										? (dataTypes[k] =
												MYSQL_DATA_TYPES[0].value)
										: dataTypes[k]
								}
								options={MYSQL_DATA_TYPES}
								onChange={(e) => onDataTypesChange(e, k)}
							/>
						))}
					</div>
					<div>
						{Array.from({ length: colNum }, (_, k) => (
							<Input
								key={`col-name-${k}`}
								
								placeholder="Column name"
								value={
									colNames[k] === undefined
										? (colNames[k] = "")
										: colNames[k]
								}
								onChange={(e) =>
									onColNamesChange(e.target.value, k)
								}
								autoComplete="nope"
							/>
						))}
					</div>
				</div>
			</div>

			<div className={style.dg__right}>
				{colNum > 0 ? (
					<>
						<Space>
							<Button onClick={onButtonClick}>Generate</Button>
							<Button
								onClick={() => {
									downloadTextFile(result, "data.sql");
								}}
							>
								Download SQL
							</Button>
							<Button
								onClick={() => {
									downloadTextFile(
										convertToJSON(colNames, rowNum, result),
										"data.json"
									);
								}}
							>
								Download JSON
							</Button>
							<Button onClick={() => clipboard.copy(result)}>
								{clipboard.copied ? "Copied" : "Copy"}
							</Button>
						</Space>
						<TextArea
							placeholder=""
							value={result}
							rows={30}
							maxLength={30}
							readOnly
						/>
					</>
				) : null}
			</div>
		</div>
	);
};

export default DataGenerator;