"use client";
import { useState } from "react";
import { calculateTDS, calculateGH, calculateKH } from "./TDSCalculator";


function Number({label, value, onChange, disabled}) {

    return (
        <>
            <label>
                <span>{label}</span>
                <input 
                    type="text"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </label>
        </>
    );
}

export default function Calculator() {

    const [ghValue, setGhValue] = useState(0);
    const [khValue, setKhValue] = useState(0);
    const [tdsValue, setTdsValue] = useState(0);

    const [ghResult, setGhResult] = useState(0);
    const [khResult, setKhResult] = useState(0);


    function handleGHChange(e) {

        const newValue = e.target.value;

        if (isValidNumber(newValue)) {

            setGhValue(newValue);

            const newGhResult = calculateGH(newValue, 1000);
            setGhResult(newGhResult);

            const tds = calculateTDS(newValue, newGhResult);

            setTdsValue(tds);
        }
    }

    function handleKHChange(e) {

        const newValue = e.target.value;

        if (isValidNumber(newValue)) {

            setKhValue(newValue);

            const newKhResult = calculateKH(newValue, 1000);
            setKhResult(newKhResult);

            const tds = calculateTDS(ghResult, newKhResult);

            setTdsValue(tds);
        }
    }

    function updateTdsValue() {

        let tds = calculateTDS(ghResult, khResult);

        setTdsValue(tds);
    }

    return (
        <div>
            <Number label="GH" value={ghValue} onChange={handleGHChange} />
            <Number label="KH" value={khValue} onChange={handleKHChange} />
            <br />
            <Number label="Resulting GH" value={ghResult} disabled={true} />
            <Number label="Resulting KH" value={khResult} disabled={true} />
            <Number label="TDS" value={tdsValue} />
        </div>
    );
}


function isValidNumber(value, regex) {

    regex = regex ? regex : /^\d{1,}(\.\d{0,2})?$/;

    return !value || regex.test(value);
}