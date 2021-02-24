import { Head } from 'next/document'
import { useContext, useEffect, useState } from 'react'
import { start } from 'repl'
import { ChallengesContext } from '../../contexts/ChallengesContexts'
import Button from '../Button/Button'
import styles from './Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export default function Countdown(){
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(0.1*60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")
    
    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time-1)
            },1000)
        } else if(isActive && time == 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    },[isActive,time])

    function startCountdown(){
        setIsActive(true)
    }

    function resetCountdown(){
        setIsActive(false)
        clearTimeout(countdownTimeout)
        setTime(0.1*60)
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
            { hasFinished ? (
                <button className={styles.countdownButton} disabled>Ciclo encerrado</button>
            ) : (
                <>
                    {isActive ?
                        ( <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>Abandonar o ciclo</button>) :
                        ( <button type="button" className={styles.countdownButton} onClick={startCountdown}>Iniciar ciclo</button>
                            )
                    }
                </>
            )}
            
        </div>
    )
}