import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number;
}

interface ChallengesContextData {
    mode: string,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    startNewChallenge: () => void;
    challengeCompleted: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [mode, setMode] = useState("dark")

    const experienceToNextLevel = Math.pow((level+1)*4,2)

    useEffect(()=>{
        Notification.requestPermission()
    },[])

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const randomChallenge = challenges[randomChallengeIndex]
        setActiveChallenge(randomChallenge)

        new Audio("/notification.mp3").play()
        if(Notification.permission === 'granted'){
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${randomChallenge.amount} xp`,
                silent: true,
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }
    
    function levelUp(){
        setLevel(level+1)
    }

    useEffect(()=>{
        if(currentExperience >= experienceToNextLevel){
            setCurrentExperience(currentExperience - experienceToNextLevel)
            levelUp()
        }
    },[currentExperience])

    async function challengeCompleted(){
        if(!activeChallenge) return
        setChallengesCompleted(challengesCompleted+1)
        setCurrentExperience(currentExperience+activeChallenge.amount)
        setActiveChallenge(null)
    }
    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                mode,
                startNewChallenge,
                resetChallenge,
                challengeCompleted
            }}>
            {children}
        </ChallengesContext.Provider>

    )
}