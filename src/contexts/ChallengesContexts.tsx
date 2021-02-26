import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye' | "legs",
    description: string,
    amount: number;
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    startNewChallenge: () => void;
    challengeCompleted: () => void;
    closeModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level || 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [modal, setModal] = useState(false)

    const experienceToNextLevel = Math.pow((level+1)*4,2)

    useEffect(()=>{
        Notification.requestPermission()
    },[])

    useEffect(()=>{
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    },[level, currentExperience, challengesCompleted])

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
        setModal(true)
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

    function closeModal(){
        setModal(false)
    }
    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                startNewChallenge,
                resetChallenge,
                challengeCompleted,
                closeModal
            }}>
            {children}
            {modal && <LevelUpModal />}
        </ChallengesContext.Provider>

    )
}