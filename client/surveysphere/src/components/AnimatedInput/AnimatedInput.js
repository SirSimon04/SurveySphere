import React, { useState, useEffect } from "react";


const AnimatedInput = ({ placeholder: passedPlaceholder = "", ...passedProps }) => {
    const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
    const [placeholderIndex, setPlaceholderIndex] = useState(0);


    useEffect(() => {
        const intr = setTimeout(() => {
            setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
            if (placeholderIndex + 1 > passedPlaceholder.length) {
                setPlaceholderIndex(0);
            } else {
                setPlaceholderIndex(placeholderIndex + 1);
            }
        }, 50);
        return () => {
            clearTimeout(intr);
        };
    });


    return <input {...passedProps} placeholder={placeholder} />;
};

export default AnimatedInput