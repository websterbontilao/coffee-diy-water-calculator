"use client";
import { useState } from "react";

function NumberField({regex}) {

    const [value, setValue] = useState(0);
    regex = regex ? regex : /^$|^-?\d+(.\d+)?$/;

    function handleInputChange(regex, event) {

        let inputValue = event.target.value;

        if (regex.test(inputValue)) {

            inputValue = inputValue !== '-' && +inputValue;
            setValue(inputValue);
        }
    }

    return (
        <input type="text" value={value} onChange={(event) => handleInputChange(regex, event)} />
    );
}


export default function NumberInput() {

    return <NumberField />;
}