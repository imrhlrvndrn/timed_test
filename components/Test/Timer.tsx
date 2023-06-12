import { useEffect, useState } from 'react';

/**
 *
 * @param duration in seconds
 * @default 5
 *
 * @param callbackFn this callback function is called when the timer hits zero
 * @returns
 */
export const Timer = ({
    duration = 5,
    callbackFn,
}: {
    duration?: number;
    callbackFn?: () => any;
}) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft >= 0) setTimeLeft((prevState) => prevState - 1);
            if (callbackFn instanceof Function && timeLeft === 0) callbackFn();
        }, 1000);
        if (timeLeft < 0) clearInterval(intervalId);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return <h1>Test timer {timeLeft >= 0 && timeLeft}</h1>;
};
