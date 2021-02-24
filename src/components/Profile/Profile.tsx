import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContexts'
import styles from './Profile.module.css'

export default function Profile() {
    const {level} = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ItaloPussi.png" alt="Italo Pussi"/>
            <div>
                <strong>Italo Pussi</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}