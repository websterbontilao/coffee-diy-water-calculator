import React, { useEffect, useState } from "react";

const DropDownField = ({ label, items, value, onChange }) => {

    const handleOnchange = (e, onChange) => {

        onChange(e);
    }

    return (
        <div className="relative mt-2">
            <select 
                name="recipes" 
                className="
                    rounded-1xl appearance-none border border-gray-300 
                    rounded min-w-0 md:min-w-xs py-2 px-3 text-gray-700 leading-tight
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => handleOnchange(e, onChange)}
            >
                {
                    items.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))
                }
            </select>
            <label className="absolute left-3 -top-2 text-gray-500 text-sm bg-white px-1">
                {label}
            </label>
        </div>
    );
}

export default DropDownField;