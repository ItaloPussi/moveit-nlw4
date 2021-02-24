import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContexts'
import styles  from './CompletedChallenges.module.css'

export default function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContext)
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}