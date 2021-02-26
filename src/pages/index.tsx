import {ChallengesContext, ChallengesProvider} from '../contexts/ChallengesContexts'
import Head  from 'next/head'
import {GetServerSideProps} from 'next'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { FiMoon, FiSun } from "react-icons/fi";
import ExperienceBar from '../components/ExperienceBar/ExperienceBar'
import CompletedChallenges from '../components/CompletedChallenges/CompletedChallenges'
import Profile from '../components/Profile/Profile'
import Countdown from '../components/Countdown/Countdown'
import ChallengeBox from '../components/ChallengeBox/ChallengeBox'

interface HomeProps{
  level: number,
  currentExperience: number,
  challengesCompleted: number
}
export default function Home(props) {
  const [isDarken, setIsDarken] = useState(true)
  function toggleDarkMode(){
    document.body.classList.toggle("light")
    setIsDarken(!isDarken)
  }

  console.log(props)
  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
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
    </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async(ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}