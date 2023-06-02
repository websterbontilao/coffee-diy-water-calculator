"use client";
import { useState } from "react";
import NumberInput from "./fields/Number";


function Number({label, value, onChange}) {

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <>
            <label>
                <span>{label}</span>
                <NumberInput defaultValue={value} />
            </label>
        </>
    );
}

export default function Calculator() {

    const [ghValue, setGhValue] = useState(0);
    const [khValue, setKhValue] = useState(0);
    const [tdsValue, setTdsValue] = useState(0);

    function handleGHChange(e) {

        const newValue = e.target.value;

        setGhValue(newValue);

        updateTdsValue();
    }

    function handleKHChange(e) {

        const newValue = e.target.value;

        setKhValue(newValue);

        updateTdsValue();
    }

    function updateTdsValue() {

        let tds = calculateTDS(ghValue, khValue);

        setTdsValue(tds);
    }

    return (
        <div>
            <Number label="GH" value={ghValue} onChange={handleGHChange} />
            <Number label="KH" value={khValue} onChange={handleKHChange} />
            <Number label="TDS" value={tdsValue} />
        </div>
    );
}

function calculateTDS(gh, kh, start_gh = 0, start_kh = 0) {

    let tds = 0.0;

    tds = calculateGH(gh, start_gh) + calculateKH(kh, start_kh);

    return tds > 0 ? tds : 0;
}

function calculateGH(gh, start_gh = 0) {

    return start_gh + gh / 1000 * 1200;
}

function calculateKH(kh, start_kh = 0) {

    return start_kh + kh / 1000 * 1680;
}