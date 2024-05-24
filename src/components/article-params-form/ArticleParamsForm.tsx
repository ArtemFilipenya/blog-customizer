import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button/ArrowButton';
import {Select} from '../select/Select';
import {RadioGroup} from '../radio-group/RadioGroup';
import {Button} from '../button/Button';
import {Separator} from '../separator/Separator';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	setPageData: (data: any) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ setPageData }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleFormChange = (key: keyof typeof articleState, option: any) => {
		setArticleState(prev => ({ ...prev, [key]: option }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageData(articleState);
	};

	const handleReset = () => {
		setPageData(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
			<aside ref={formRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
					<h2>Задайте параметры</h2>
					<Select
						title="Шрифт"
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={option => handleFormChange('fontFamilyOption', option)} />
					<RadioGroup
						name="fontSize"
						title="Размер шрифта"
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={option => handleFormChange('fontSizeOption', option)}
					/>
					<Select
						title="Цвет шрифта"
						selected={articleState.fontColor}
						options={fontColors}
						onChange={option => handleFormChange('fontColor', option)} />
					<Separator />
					<Select
						title="Цвет фона"
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={option => handleFormChange('backgroundColor', option)}
					/>
					<Select
						title="Ширина контента"
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={option => handleFormChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" type="reset" />
						<Button title="Применить" type="submit" />
					</div>
				</form>
			</aside>
		</>
	);
};

export default ArticleParamsForm;