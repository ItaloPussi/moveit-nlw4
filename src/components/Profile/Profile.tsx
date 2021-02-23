import styles from './Profile.module.css'

export default function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/ItaloPussi.png" alt="Italo Pussi"/>
            <div>
                <strong>Italo Pussi</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}