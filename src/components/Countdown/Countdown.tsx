import { Head } from 'next/document'
import { useContext, useEffect, useState } from 'react'
import { start } from 'repl'
import { ChallengesContext } from '../../contexts/ChallengesContexts'
import styles from './Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export default function Countdown(){
    const {startNewChallenge, activeChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(25*60)
    const [isActive, setIsActive] = useState(false)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;

    const [starterTime, setStarterTime] = useState(null)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
    const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")
    
    useEffect(()=>{
        if(activeChallenge == null){
            resetCountdown()
        }
    }, [activeChallenge])
    
    const timer = () => {
        let now:any = new Date()
        let difference = Math.floor(Math.abs((starterTime-now)/1000))
        let timeleft = 25*60-difference
        if(timeleft <0) {
            timeleft = 0
        }
        setTime(timeleft)
    }
    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                timer()
            },1000)
        } else if(isActive && time == 0){
            setIsActive(false)
            startNewChallenge()
        }
    },[isActive,time])

    function startCountdown(){
        setIsActive(true)
        setStarterTime(new Date())
    }

    function resetCountdown(){
        setIsActive(false)
        clearTimeout(countdownTimeout)
        setTime(25*60)
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
            { activeChallenge ? (
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