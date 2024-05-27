import React, { useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import ArticleParamsForm from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from './App.module.scss';

export const App: React.FC = () => {
	const [pageData, setPageData] =
		useState<ArticleStateType>(defaultArticleState);

	const style: React.CSSProperties = {
		'--font-family': pageData.fontFamilyOption.value,
		'--font-size': pageData.fontSizeOption.value,
		'--font-color': pageData.fontColor.value,
		'--container-width': pageData.contentWidth.value,
		'--bg-color': pageData.backgroundColor.value,
	} as React.CSSProperties;

	return (
		<div className={clsx(styles.main)} style={style}>
			<ArticleParamsForm setPageData={setPageData} />
			<Article />
		</div>
	);
};
