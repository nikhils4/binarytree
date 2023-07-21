import { Row } from "antd";
import ArticleCard from "./Article";
import style from "./articles.module.scss";
import { Article } from "pages/News/types.ts/types";

interface PropsType {
	articles: Article[];
}

const Articles: React.FC<PropsType> = ({ articles }) => {
	return (
		<div className={style.articles}>
			<Row gutter={[16, 16]}>
				{articles.map((article) => (
					<ArticleCard {...article} key={article.url} />
				))}
			</Row>
		</div>
	);
};

export default Articles;