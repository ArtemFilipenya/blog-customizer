import React from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

interface ArrowButtonProps {
	isOpen: boolean;
	onToggle: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	isOpen,
	onToggle,
}) => (
	<div
		role='button'
		aria-label={
			isOpen
				? 'Закрыть форму параметров статьи'
				: 'Открыть форму параметров статьи'
		}
		tabIndex={0}
		onClick={onToggle}
		className={clsx(styles.container, { [styles.container_open]: isOpen })}>
		<img
			src={arrow}
			alt='иконка стрелочки'
			className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
		/>
	</div>
);
