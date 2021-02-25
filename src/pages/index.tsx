import styles from '../styles/Home.module.css'
import { FiMoon, FiSun } from "react-icons/fi";
import ExperienceBar from '../components/ExperienceBar/ExperienceBar'
import CompletedChallenges from '../components/CompletedChallenges/CompletedChallenges'
import Profile from '../components/Profile/Profile'
import Countdown from '../components/Countdown/Countdown'
import Head  from 'next/head'
import ChallengeBox from '../components/ChallengeBox/ChallengeBox'
import { useState } from 'react';

export default function Home() {
  const [isDarken, setIsDarken] = useState(true)
  function toggleDarkMode(){
    document.body.classList.toggle("light")
    setIsDarken(!isDarken)
  }
  return (
    <>
      <button className={styles.darkModeButton} onClick={toggleDarkMode}>
        {isDarken ?
          (<FiSun />) :
          (<FiMoon />)
        }
      </button>

      <div className={styles.container}>
        <Head>
          <title>Inicio | Move It</title>
        </Head>
        <ExperienceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
      </div>
    </>
  )
}
