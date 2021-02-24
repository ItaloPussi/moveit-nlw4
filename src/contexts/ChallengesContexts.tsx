import {createContext, ReactNode, useState} from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye',
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
    
    const experienceToNextLevel = Math.pow((level+1)*4,2)

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const randomChallenge = challenges[randomChallengeIndex]
        setActiveChallenge(randomChallenge)
    }

    function resetChallenge(){
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
                startNewChallenge,
                resetChallenge,
            }}>
            {children}
        </ChallengesContext.Provider>

    )
}