"use client";
import { useState } from "react";
import { calculateTDS, calculateGH, calculateKH } from "./TDSCalculator";

import Number from "./fields/NumberField";

export default function Calculator() {

    const [initialGhValue, setinitialGhValue] = useState('');
    const [initialKhValue, setinitialKhValue] = useState('');
    const [ghValue, setGhValue] = useState('');
    const [khValue, setKhValue] = useState('');
    const [tdsValue, setTdsValue] = useState(0);

    const [ghResult, setGhResult] = useState(0);
    const [khResult, setKhResult] = useState(0);


    function handleGHChange(e) {

        const newValue = e.target.value;

        setGhValue(newValue);

        const newGhResult = calculateGH(newValue, 1000);
        setGhResult(newGhResult);

        const tds = calculateTDS(newValue, khResult);

        setTdsValue(tds);
    }

    function handleKHChange(e) {

        const newValue = e.target.value;

        setKhValue(newValue);

        const newKhResult = calculateKH(newValue, 1000);
        setKhResult(newKhResult);

        const tds = calculateTDS(ghResult, newKhResult);

        setTdsValue(tds);
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
