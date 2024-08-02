import { Editor } from '@/components/editor/Editor'
import Header from '@/components/ui/Header'
import React from 'react'

const Document = () => {
  return (
    <div>
      <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
          <p className='text-white'>Document</p>
        </div>
      </Header>
      <Editor />
    </div>
  )
}

export default Document