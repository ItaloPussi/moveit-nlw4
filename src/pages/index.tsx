import styles from '../styles/Home.module.css'

import ExperienceBar from '../components/ExperienceBar/ExperienceBar'
import CompletedChallenges from '../components/CompletedChallenges/CompletedChallenges'
import Profile from '../components/Profile/Profile'
import Countdown from '../components/Countdown/Countdown'
import Head  from 'next/head'
import ChallengeBox from '../components/ChallengeBox/ChallengeBox'

export default function Home() {
  return (
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
  )
}
