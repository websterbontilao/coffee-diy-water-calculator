"use client";
import { useState } from "react";

export default function NumberInput({defaultValue, regex}) {

    const [value, setValue] = useState(defaultValue);

    function handleInputChange(regex, event) {

        let inputValue = event.target.value;
        regex = regex ? regex : /^\d{1,}(\.\d{0,2})?$/;

        if (!inputValue || regex.test(inputValue)) {

            setValue(inputValue);
        }
    }

    return (
        <input type="text" value={value} onChange={(event) => handleInputChange(regex, event)} />
    );
}