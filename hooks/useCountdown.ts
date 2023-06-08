
/**
 *
 * @param initialTime initial countdown time in ms
 * @param callback executed function whenever the timer reaches 0
 */

import { useEffect, useState } from 'react';

export const useCountdown = (initialTime: number, callback: () => void) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (time > 0) setTime((prev) => prev - 1000);
        }, 1000);

        if (time === 0) callback();

        return () => clearInterval(countdownInterval);
    }, [time]);

    return time;
};
