import i18nextConfig from '~/../next-i18next.config'
import { GetStaticPropsContext } from 'next'
import { DEFAULT_LANGUAGE } from '~/util/constants'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getI18nPaths = function (): { params: { [k: string]: any } }[] {
  return i18nextConfig.i18n.locales.map((locale) => ({
    params: {
      locale: locale
    }
  }))
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
})

export const makeStaticProps = function () {
  return async function getStaticProps({ params }: GetStaticPropsContext) {
    const locale = typeof params?.locale === 'string' && params?.locale ?
      params.locale : DEFAULT_LANGUAGE
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common']))
      }
    }
  }
}