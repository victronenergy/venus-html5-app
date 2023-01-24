import React from 'react'

const ErrorFallback = ({}) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-v-red/30 border-4 border-v-red rounded-md'>
      <h1>There was an error! Please try restarting the app!</h1>
    </div>
  )
}

export default ErrorFallback
