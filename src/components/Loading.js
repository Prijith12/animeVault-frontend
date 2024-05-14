import React from 'react'
import { CircularProgress } from '@mui/material';
function Loading() {
  return (
    <div className='flex justify-center items-center '>
      <CircularProgress/>
    </div>
  )
}

export function LoadingSm() {
  return (
    <div className='flex justify-center items-center '>
      <CircularProgress size={20}/>
    </div>
  )
}

export default Loading
