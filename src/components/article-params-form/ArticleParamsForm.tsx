import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button/ArrowButton';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Button } from '../button/Button';
import { Separator } from '../separator/Separator';
import { Text } from '../text/Text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	setPageData: (data: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
																		setPageData,
																	}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [paramsState, setParamsState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const handleFormChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setParamsState((prev) => ({ ...prev, [key]: option }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageData(paramsState);
	};

	const handleReset = () => {
		setPageData(defaultArticleState);
		setParamsState(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<div className={styles.title}>
						<Text as='h2'>Задайте параметры</Text>
					</div>
					<Select
						title='Шрифт'
						selected={paramsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleFormChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={paramsState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleFormChange('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						selected={paramsState.fontColor}
						options={fontColors}
						onChange={(option) => handleFormChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={paramsState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleFormChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={paramsState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleFormChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

export default ArticleParamsForm;
