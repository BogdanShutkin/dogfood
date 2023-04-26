import { useState, useEffect } from 'react';

const useDebouncedValue  = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay)

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debounceValue;
}

export default useDebouncedValue ;