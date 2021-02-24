import ChallengeBox from '../components/ChallengeBox/ChallengeBox'
import {ChallengesContext, ChallengesProvider} from '../contexts/ChallengesContexts'
import "../styles/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
    
  )
}

export default MyApp
