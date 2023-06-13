"use client";
import { useState } from "react";
import { calculateTDS, calculateGH, calculateKH, calculateWater } from "./TDSCalculator";

import Number from "./fields/NumberField";

export default function Calculator() {

    const [waterValue, setWaterValue] = useState(1000);
    const [initialGhValue, setInitialGhValue] = useState('');
    const [initialKhValue, setInitialKhValue] = useState('');
    const [ghValue, setGhValue] = useState('');
    const [khValue, setKhValue] = useState('');
    const [tdsValue, setTdsValue] = useState(0);

    const [ghResult, setGhResult] = useState(0);
    const [khResult, setKhResult] = useState(0);


    function handleGHChange(e) {

        setGhValue(e.target.value);

        const newValue = updateGhResults(e.target.value, initialGhValue);

        updateTDSResults(newValue, khResult);
    }

    function handleInitialGhChange(e) {

        setInitialGhValue(e.target.value);

        const newValue = updateGhResults(ghValue, e.target.value);

        updateTDSResults(newValue, khResult);
    }

    function updateGhResults(gh, initialGh) {

        const water = calculateWater(gh, khValue, waterValue);
        const newGhResult = calculateGH(gh, water, initialGh);

        setGhResult(newGhResult);

        return newGhResult;
    }

    function handleKHChange(e) {

        setKhValue(e.target.value);

        const newValue = updateKhResults(e.target.value, initialKhValue);

        updateTDSResults(ghResult, newValue);
    }

    function handleInitialKhChange(e) {

        setInitialKhValue(e.target.value);

        const newValue = updateKhResults(khValue, e.target.value);

        updateTDSResults(ghResult, newValue);
    }

    function updateKhResults(kh, initialKh) {

        const water = calculateWater(ghValue, kh, waterValue);
        console.log(waterValue);
        const newKhResult = calculateKH(kh, water, initialKh);

        setKhResult(newKhResult);

        return newKhResult;
    }

    function updateTDSResults(gh, kh) {

        const tds = calculateTDS(gh, kh);

        setTdsValue(tds);
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
