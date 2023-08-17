'use client'

import './style.css'
import localFont from 'next/font/local'
import Head from 'next/head'
import BattleBar from '../../components/organisms/BattleBar'
import BattleField from '../../components/organisms/BattleField'
import CommandMenu from '../../components/organisms/CommandMenu'
import { Context } from '../../game/context'
import useGameContext from '../../game/main'

const myFont = localFont({ src: '../../../public/fonts/BestTen-CRT.otf' })

const GameWindow = () => {
  const initialContext = useGameContext()

  return (
    <Context.Provider value={initialContext}>
      <Head>
        <link />
      </Head>
      <main className={myFont.className}>
        {/* <div className='flex justify-center m-4'>
          <div className='bg-black w-[960px] h-[540px]'> */}
        <div className='flex justify-center flex-col items-center'>
          <BattleBar className={'w-[920px] h-[50px] mt-2'} />
          <BattleField className={'w-[920px] h-[350px]'} />
          <CommandMenu className={'w-[920px] h-[120px] mb-2'} />
          {/* </div>
          </div> */}
        </div>
      </main>
    </Context.Provider>
  )
}

export default GameWindow
