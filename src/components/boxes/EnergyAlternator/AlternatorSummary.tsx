import React from 'react'
import { useTranslation } from 'next-i18next'
import { useAlternator } from '@elninotech/mfd-modules'

const AlternatorSummary = ({ instance, showInstance }: Props) => {
  const { t } = useTranslation()
  const { current } = useAlternator(instance)

  return <p>
    {t('boxes.alternator')}
    { showInstance ? ` [${instance}]` : null}
    : { current || current === 0 ? Math.round(current) : '--' }A
  </p>
}

interface Props {
  instance: number
  showInstance: boolean
}

export default AlternatorSummary
