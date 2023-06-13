
export default function Number({label, value, onChange, disabled, regex}) {

    function handleNumberChange(event, onChange) {

        const newVal = event.target.value;

        if (validateNumber(newVal) && onChange) {

            onChange(event);
        }
    }

    return (
        <div className="mt-2">
            <div className="relative">
                <input
                    className="rounded-1xl appearance-none border border-gray-300 rounded w-full min-w-0 md:min-w-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={value}
                    onChange={(event) => handleNumberChange(event, onChange)}
                    placeholder="0"
                    disabled={disabled}
                />
                <label className="absolute left-3 -top-2 text-gray-500 text-sm bg-white px-1">
                    {label}
                </label>
            </div>
        </div>
    );
}

function validateNumber(value, regex) {

    regex = regex ? regex : /^(\d{1,}(\.\d{0,2})?)?$/;

    return regex.test(value);
}