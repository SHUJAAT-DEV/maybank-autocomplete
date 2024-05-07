import React, { ChangeEvent } from 'react';
import './index.css'

interface InputProps {
    placeholder: string;
    value?: string;
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange,type}) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
);

export default Input;