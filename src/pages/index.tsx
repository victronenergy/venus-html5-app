import { useRouter } from 'next/router'
import { DEFAULT_LANGUAGE, LANGUAGE_KEY_LOCAL_STORAGE } from '~/utils/constants'
import { useEffect } from 'react'

const Redirect = () => {
  const router = useRouter()

  useEffect(() => {
    const language = localStorage.getItem(LANGUAGE_KEY_LOCAL_STORAGE) ?? DEFAULT_LANGUAGE
    if (!router.pathname.startsWith('/[locale]')) {
      router.replace('/' + language + router.asPath)
    }
  }, [router])

  return <></>
}

export default Redirect
