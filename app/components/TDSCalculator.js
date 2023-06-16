"use client";
import { useEffect, useState } from "react";
import Number from "./fields/NumberField";

function calculateTDS (
    gh,
    kh,
    initial_tds = 0,
    total_water = 1000
) {
    let tds = initial_tds + gh / total_water * 1200 + kh / total_water * 1680;

    return tds || 0;
}

function calculateGH(gh, water, initial_gh = 0, total_water = 1000) {

    let ret = ((initial_gh * water) + (1001.41 * gh)) / total_water;

    return Math.floor(ret) || 0;
}

function calculateKH(kh, water, initial_kh = 0, total_water = 1000) {

    let ret = ((initial_kh * water) + (1002.46 * kh)) / total_water;

    return Math.floor(ret) || 0;
}

function calculateWater(gh, kh, total_volume = 1000) {

    return total_volume - gh - kh;
}

export default function TDSCalculator() {

    const [waterValue, setWaterValue] = useState(1000);
    const [initialGhValue, setInitialGhValue] = useState('');
    const [initialKhValue, setInitialKhValue] = useState('');
    const [ghValue, setGhValue] = useState('');
    const [khValue, setKhValue] = useState('');

    const [ghResult, setGhResult] = useState('');
    const [khResult, setKhResult] = useState('');
    const [tdsResult, setTdsResult] = useState('');

    useEffect(() => {

        const waterResult = calculateWater(ghValue, khValue);
        const newGhResult = calculateGH(ghValue, waterResult, initialGhValue, waterValue);

        setGhResult(newGhResult);

    }, [ghValue, initialGhValue, waterValue]);

    useEffect(() => {

        const waterResult = calculateWater(ghValue, khValue);
        const newKhResult = calculateKH(khValue, waterResult, initialKhValue, waterValue);
        setKhResult(newKhResult);

    }, [khValue, initialKhValue, waterValue]);

    useEffect(() => {

        let tdsValue = calculateTDS(ghResult, khResult);
        setTdsResult(tdsValue);

    }, [ghResult, khResult]);

    return (
        <div className="flex flex-col flex-nowrap ml-5 mt-5">
            <div className="w-1/2">
                <Number label="Total Water (mL)" value={waterValue} onChange={(e) => { setWaterValue(e.target.value) }} />
            </div>
            <div className="flex flex-row">
                <Number label="Initial GH (ppm)" value={initialGhValue} onChange={(e) => { setInitialGhValue(e.target.value) }} />
                <div className="ml-1 flex-none">
                    <Number label="GH (mL)" value={ghValue} onChange={(e) => { setGhValue(e.target.value) }} />
                </div>
            </div>
            <div className="flex flex-row">
                <Number label="Initial KH (ppm)" value={initialKhValue} onChange={(e) => { setInitialKhValue(e.target.value) }} />
                <div className="ml-1 flex-none">
                    <Number label="KH (mL)" value={khValue} onChange={(e) => { setKhValue(e.target.value) }} />
                </div>
            </div>
            <div className="w-1/5 mt-5">
                <Number label="Resulting GH" value={ghResult} disabled={true} />
                <Number label="Resulting KH" value={khResult} disabled={true} />
                <Number label="Resulting TDS" value={tdsResult} disabled={true} />
            </div>
        </div>
    );
}