'use client'

import BasicOptions, { Option } from '../molecules/BasicOptions'
import EnemyInfo from '../molecules/EnemyInfo'

export type Props = {
  className: string
}

const hoge: Option = {
  display_name: 'たたかう',
  onClick: () => {
    return
  },
}

const basic_options: Option[] = [
  {
    display_name: 'たたかう',
    onClick: () => {
      return
    },
  },
  {
    display_name: 'わざ',
    onClick: () => {
      return
    },
  },
  {
    display_name: 'どうぐ',
    onClick: () => {
      return
    },
  },
  {
    display_name: 'にげる',
    onClick: () => {
      return
    },
  },
]

const CommandMenu = ({ className }: Props) => {
  return (
    // <div className={}>
    <div className={`flex bg-blue-600 rounded-lg border-2 border-t-red-50 ${className}`}>
      {/* <div className='flex'> */}
      {/* <div className='flex-[0.8] h-full border-2 border-t-red-50'> */}
      <BasicOptions
        className='flex-[0.8] h-full'
        options={basic_options}
      />
      {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      {/* </div> */}

      <EnemyInfo className='flex-1 h-full border-x-2'/>

{/*
      <div >
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      {/* </div> */}

      <div className='flex-[2] h-full border-t-red-50'>
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      </div>
      {/* </div> */}
    </div>
    // </div>
  )
}

export default CommandMenu
