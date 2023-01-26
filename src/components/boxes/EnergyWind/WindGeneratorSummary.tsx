import React from 'react'
import { useTranslation } from 'next-i18next'
import { useWindGenerator } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'

const WindGeneratorSummary = ({ instance, showInstance }: Props) => {
  const { t } = useTranslation()
  const { current } = useWindGenerator(instance)

  return <p>
    {t('boxes.windGenerator')}
    { showInstance ? ` [${instance}]` : null}
    : { current || current === 0 ? Math.round(current) : '--' }A
  </p>
}

interface Props {
  instance: number
  showInstance: boolean
}

export default observer(WindGeneratorSummary)
