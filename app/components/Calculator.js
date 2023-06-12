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
            <div className="flex flex-row">
                <Number label="Initial GH" value={ghValue} onChange={handleGHChange} />
                <span className="ml-1">
                    <Number label="GH" value={ghValue} onChange={handleGHChange} />
                </span>
            </div>
            <div className="flex flex-row">
                <Number label="Initial KH" value={khValue} onChange={handleKHChange} />
                <div className="ml-1 flex-none">
                    <Number label="KH" value={khValue} onChange={handleKHChange} />
                </div> 
            </div>
           
            
            <br />
            <Number label="Resulting GH" value={ghResult} disabled={true} />
            <Number label="Resulting KH" value={khResult} disabled={true} />
            <Number label="Resulting TDS" value={tdsValue} disabled={true} />
        </div>
    );
}
