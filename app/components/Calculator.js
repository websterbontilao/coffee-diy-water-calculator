"use client";
import { useState } from "react";
import NumberInput from "./fields/Number";

let calculatorValues = {
    "gh": 0.0,
    "kh": 0.0,
    "tds": 0.0
};

function Number({label, value}) {

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

    const [values, setValues] = useState(calculatorValues);

    function handleGHChange(e) {

        const newValues = [...values];
        newValues.gh = e.target.value;

        let tds = calculateTDS(newValues.gh, newValues.kh);

        newValues.tds = tds;

        setValues(newValues);
    }

    function handleKHChange(e) {

        const newValues = [...values];
        newValues.kh = e.target.value;

        let tds = calculateTDS(newValues.gh, newValues.kh);

        newValues.tds = tds;

        setValues(newValues);
    }

    return (
        <div>
            <Number label="GH" value={values.gh} onChange={handleGHChange} />
            <Number label="KH" value={values.kh} onChange={handleKHChange} />
            <Number label="TDS" value={values.tds} />
        </div>
    );
}

function calculateTDS(gh, kh, start_gh = 0, start_kh = 0) {

    let tds = 0.0;

    tds = calculateGH(gh && 0, start_gh) + calculateKH(kh && 0, start_kh);

    return tds > 0 ? tds : 0;
}

function calculateGH(gh, start_gh = 0) {

    return start_gh + gh / 1000 * 1200;
}

function calculateKH(kh, start_kh = 0) {

    return start_kh + kh / 1000 * 1680;
}