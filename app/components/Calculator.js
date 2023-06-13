"use client";
import { useEffect, useState } from "react";
import { calculateTDS, calculateGH, calculateKH, calculateWater } from "./TDSCalculator";

import Number from "./fields/NumberField";

export default function Calculator() {

    const [waterValue, setWaterValue] = useState(1000);
    const [initialGhValue, setInitialGhValue] = useState('');
    const [initialKhValue, setInitialKhValue] = useState('');
    const [ghValue, setGhValue] = useState('');
    const [khValue, setKhValue] = useState('');

    let ghResult = calculateGH(ghValue, waterValue, initialGhValue);
    let khResult = calculateKH(khValue, waterValue, initialKhValue);

    let tdsValue = calculateTDS(ghResult, khResult);

    function handleGHChange(e) {

        setGhValue(e.target.value);
    }

    function handleInitialGhChange(e) {

        setInitialGhValue(e.target.value);
    }

    function handleKHChange(e) {

        setKhValue(e.target.value);
    }

    function handleInitialKhChange(e) {

        setInitialKhValue(e.target.value);
    }

    function handleWaterChange(e) {

        setWaterValue(e.target.value);
    }

    return (
        <div className="flex flex-col flex-nowrap ml-5 mt-5">
            <div className="w-1/5">
             <Number label="Total Water (mL)" value={waterValue} onChange={handleWaterChange} />
            </div>
            <div className="flex flex-row">
                <Number label="Initial GH (ppm)" value={initialGhValue} onChange={handleInitialGhChange} />
                <span className="ml-1">
                    <Number label="GH (mL)" value={ghValue} onChange={handleGHChange} />
                </span>
            </div>
            <div className="flex flex-row">
                <Number label="Initial KH (ppm)" value={initialKhValue} onChange={handleInitialKhChange} />
                <div className="ml-1 flex-none">
                    <Number label="KH (mL)" value={khValue} onChange={handleKHChange} />
                </div> 
            </div>
           
            <br />
            <div className="w-1/5">
                <Number label="Resulting GH" value={ghResult} disabled={true} />
                <Number label="Resulting KH" value={khResult} disabled={true} />
                <Number label="Resulting TDS" value={tdsValue} disabled={true} />
            </div>
        </div>
    );
}
