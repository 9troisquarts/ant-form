import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';

type BooleanProps = {
	value: boolean;
	onChange: (value: boolean) => void;
	text?: string;
}

const Boolean: React.FC<BooleanProps> = props => {
	const {
		onChange,
		text,
	} = props;

	const [value, setValue] = useState(props.value || false);

	const handleChange = (checked: boolean) => {
		setValue(checked);
		onChange(checked);
	};

	useEffect(() => setValue(props.value || false), [props.value])

	return (
		<span>
			<Switch onChange={handleChange} checked={value} />
			{ text && (
				<span style={{ marginLeft: 5 }}>
					{text}
				</span>
			)}
		</span>
	)
}

export default Boolean;
