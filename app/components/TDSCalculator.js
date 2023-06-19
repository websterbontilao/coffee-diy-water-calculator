"use client";
import { useEffect, useState } from "react";
import Number from "./fields/NumberField";
import DropDownField from "./fields/DropDownField";

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

    const [totalVolume, setTotalVolume] = useState(1000);
    const [waterResult, setWaterResult] = useState(1000);
    const [initialGH, setInitialGH] = useState('');
    const [initialKH, setInitialKH] = useState('');
    const [gh, setGhValue] = useState('');
    const [kh, setKH] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [disableFields, setDisableFields] = useState(false);

    const [ghResult, setGhResult] = useState('');
    const [khResult, setKhResult] = useState('');
    const [tdsResult, setTdsResult] = useState('');

    const waterRecipes = require('../data/waterRecipes.json');
    const items = Object.keys(waterRecipes);

    const onRecipeChange = (value) => {

        setDisableFields(value.toLowerCase() !== "custom")

        setSelectedRecipe(value);

        setGhValue(waterRecipes[value]?.gh);
        setKH(waterRecipes[value]?.kh);
    }

    useEffect(() => {

        const calculatedWaterResult = calculateWater(gh, kh, totalVolume);

        setWaterResult(calculatedWaterResult);
        
    }, [gh, kh, totalVolume]);

    useEffect(() => {

        const newGhResult = calculateGH(gh, waterResult, initialGH, totalVolume);

        setGhResult(newGhResult);

    }, [gh, initialGH, totalVolume]);

    useEffect(() => {

        const newKhResult = calculateKH(kh, waterResult, initialKH, totalVolume);
        setKhResult(newKhResult);

    }, [kh, initialKH, totalVolume]);

    useEffect(() => {

        const tdsValue = calculateTDS(ghResult, khResult);
        setTdsResult(tdsValue);

    }, [ghResult, khResult]);

    return (
        <div className="flex flex-col flex-nowrap ml-5 mt-5">
            <div className="flex flex-row">
                <DropDownField
                    label="Recipe"
                    items={items} 
                    value={selectedRecipe} 
                    onChange={(e) => onRecipeChange(e.target.value) } 
                />
            </div>
            <div className="flex flex-row">
                <Number 
                    label="Expected Total Volume (mL)" 
                    value={totalVolume} 
                    onChange={(e) => { setTotalVolume(e.target.value) }} 
                />
                <div className="ml-1 flex-none">
                    <Number 
                        label="Deionised Water"
                        value={waterResult}
                        onChange={(e) => { setWaterResult(e.target.value) }}
                        disabled={true}
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <Number 
                    label="Initial GH (ppm)"
                    value={initialGH}
                    onChange={(e) => { setInitialGH(e.target.value) }}
                />
                <div className="ml-1 flex-none">
                    <Number 
                        label="GH (mL)"
                        value={gh}
                        onChange={(e) => { setGhValue(e.target.value) }} 
                        disabled={disableFields}
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <Number 
                    label="Initial KH (ppm)"
                    value={initialKH}
                    onChange={(e) => { setInitialKH(e.target.value) }} 
                />
                <div className="ml-1 flex-none">
                    <Number 
                        label="KH (mL)"
                        value={kh}
                        onChange={(e) => { setKH(e.target.value) }}
                        disabled={disableFields}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <Number label="Resulting GH" value={ghResult} disabled={true} />
                <Number label="Resulting KH" value={khResult} disabled={true} />
                <Number label="Resulting TDS" value={tdsResult} disabled={true} />
            </div>
        </div>
    );
}