import { Head } from 'next/document'
import { useEffect, useState } from 'react'
import { start } from 'repl'
import styles from './Countdown.module.css'

export default function Countdown(){
    const [time, setTime] = useState(1500)
    const [active, setActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")
    
    useEffect(()=>{
        if(active && time > 0){
            setTimeout(()=>{
                setTime(time-1)
            },1000)
        }
    },[active,time])

    function startCountdown(){
        setActive(true)
    }
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>
    )
}