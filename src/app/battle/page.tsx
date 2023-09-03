'use client'

import './style.css'
import localFont from 'next/font/local'
import Head from 'next/head'
import BattleBar from '../../components/organisms/BattleBar'
import BattleField from '../../components/organisms/BattleField'
import CommandMenu from '../../components/organisms/CommandMenu'
import { Context } from '../../game/context'
import useGameContext from '../../game/main'
import Button from '@/components/atoms/Button'

const myFont = localFont({ src: '../../../public/fonts/BestTen-CRT.otf' })

const GameWindow = () => {
  const initialContext = useGameContext()

  return (
    <Context.Provider value={initialContext}>
      <Head>
        <link />
      </Head>
      <div className={``}>
        <main className={`${myFont.className} bg-battle`}>
          <div className='flex justify-center flex-col items-center bg-gray-400 bg-opacity-70'>
            <BattleBar className={'w-[920px] h-[50px] mt-2'} />
            <BattleField className={'w-[920px] h-[350px]'} />
            <CommandMenu className={'w-[920px] h-[120px] mb-3'} />
          </div>
        </main>
      </div>
    </Context.Provider>
  )
}

export default GameWindow
