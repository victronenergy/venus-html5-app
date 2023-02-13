import { useRouter } from 'next/router'
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { DEFAULT_LANGUAGE } from '~/utils/constants'

const LinkComponent = ({ children, href, ...rest }: Props) => {
  const router = useRouter()
  const locale = typeof router.query.locale === 'string' && router.query.locale ? router.query.locale : DEFAULT_LANGUAGE

  href = href ? `/${locale}${href}` : router.pathname.replace('[locale]', locale)

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}

interface Props extends LinkProps {
  children?: JSX.Element | string
}

export default LinkComponent
