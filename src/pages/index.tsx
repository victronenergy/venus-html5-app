import { useRouter } from 'next/router'
import { DEFAULT_LANGUAGE, LANGUAGE_KEY_LOCAL_STORAGE } from '~/utils/constants'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import EnergyAC from '~/components/boxes/EnergyAC'
import EnergyShore from '~/components/boxes/EnergyShore'
import Tanks from '~/components/boxes/Tanks'

const Redirect = () => {
  const router = useRouter()

  useEffect(() => {
    const language = localStorage.getItem(LANGUAGE_KEY_LOCAL_STORAGE) ?? DEFAULT_LANGUAGE
    if (!router.pathname.startsWith('/[locale]')) {
      router.replace('/' + language + router.asPath)
    }
  }, [router])
    // TODO: add translations
    navigationStore.setTitle('System Overview')
  }, [])

  return (
    <div className={'p-4 h-full'}>
      <Grid className={'gap-2'}>
        <EnergyOverview />
        <EnergyAC mode={'full'} />
        <EnergyShore />
        <Tanks />
      </Grid>
    </div>
  )
}

  return <></>
}

export default Redirect
