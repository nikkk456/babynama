import React, { useEffect, useState } from 'react'

const Countdown = () => {
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timeinterval;

    const start = () => {
        setIsRunning(true);
        timeinterval = setInterval(() => {
            if (totalMinutes === 0 && sec === 0) {
                clearInterval(timeinterval);
                setIsRunning(false);
            } else {
                setSec((prevsec) => {
                    if (prevsec === 0) {
                        setTotalMinutes((prevTotalMinutes) => {
                            const newTotalMinutes = prevTotalMinutes - 1;
                            updateHoursAndMinutes(newTotalMinutes);
                            return newTotalMinutes;
                        })
                        return 59;
                    } else {
                        return prevsec - 1;
                    }
                });
            }
        }, 1000);
    };

    useEffect(() => {
        if (isRunning) {
            start();
        }
        return () => {
            clearInterval(timeinterval);
        };
    }, [totalMinutes, sec, isRunning]);


    const reset = () => {
        setIsRunning(false);
        setTotalMinutes(0);
        setMin(0);
        setSec(0);
        setHour(0);
    };

    const pause = () => {
        setIsRunning(false);

    }
    const updateHoursAndMinutes = (totalMinutes) => {
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        setHour(newHours);
        setMin(newMinutes);
    };

    const handleChange = (e) => {
        let newInt = Math.max(parseInt(e.target.value, 10), 0);
        if (isRunning) {
            setIsRunning(false);
            setTotalMinutes(newInt);
            setHour(0);
            setMin(0);
            setSec(0);
        }
        else {
            setTotalMinutes(newInt);
            updateHoursAndMinutes(newInt);
            setSec(0);
        }
        setIsRunning(false);
    }
    return (
        <div className='container'>
            <div className='input-style'>
                <label style={{ marginBottom: '10px', fontWeight: '500', fontSize: 'larger' }}>Enter Minutes</label>
                <input type='number' onChange={handleChange} value={totalMinutes} className='input-box' />
            </div>
            <div className='play-pause'>
                {
                    isRunning ?
                        <button onClick={pause} className='play-button'><center><svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path fill="#fafcff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" /></svg></center></button>
                        :
                        <button onClick={() => setIsRunning(true)} className='play-button'>
                            <center><svg xmlns="http://www.w3.org/2000/svg" height="23" width="31" viewBox="0 0 384 512"><path fill="#fafcff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg></center>
                        </button>
                }
                <div className='timing'> <p style={{ fontSize: 'xx-large', fontWeight: '600' }}>{`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`}</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    )
}

export default Countdown
