import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';

export type BooleanProps = {
	value: boolean;
  inverted?: boolean;
	onChange: (value: boolean) => void;
	text?: string;
}

const Boolean: React.FC<BooleanProps> = props => {
	const {
		onChange,
		text,
    inverted = false,
	} = props;

	const [value, setValue] = useState(props.value || false);

	const handleChange = (checked: boolean) => {
    const nextValue = inverted ? !checked : checked;
		setValue(nextValue);
		onChange(nextValue);
	};

	useEffect(() => setValue(props.value || false), [props.value])

	return (
		<span>
			<Switch onChange={handleChange} checked={inverted ? !value : value} />
			{ text && (
				<span style={{ marginLeft: 5 }}>
					{text}
				</span>
			)}
		</span>
	)
}

export default Boolean;
