import styles from '../styles/Home.module.css'

import ExperienceBar from '../components/ExperienceBar/ExperienceBar'
import CompletedChallenges from '../components/CompletedChallenges/CompletedChallenges'
import Profile from '../components/Profile/Profile'
import Countdown from '../components/Countdown/Countdown'
import Head  from 'next/head'

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
          
        </div>
      </section>
    </div>
  )
}
