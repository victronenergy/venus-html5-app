import { usePvCharger } from '@elninotech/mfd-modules'

const Solar = () => {
  const { current, power } = usePvCharger()
  const hasSolar = !!(current || power || power === 0)

  return <>
    { hasSolar && (
      <p>Solar Yield: { Math.round(current) }A</p>
    )}
  </>
}

export default Solar