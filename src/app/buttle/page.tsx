'use client'

import Image from 'next/image'
import { createContext, useContext, useEffect } from 'react'
import BattleBar from '../components/organisms/BattleBar'
import BattleField from '../components/organisms/BattleField'
import CommandMenu from '../components/organisms/CommandMenu'

export type gameContext = {
  focus: {
    basicCommandFocus: boolean
    enemyInfoFocus: boolean
    userInfoFocut: boolean
  }
}

export const GameContext = createContext<gameContext>({
  focus: {
    basicCommandFocus: false,
    enemyInfoFocus: false,
    userInfoFocut: false,
  },
})

const GameWindow = () => {
  const context = useContext(GameContext)
  // コンテキストの値が変化した際に実行される処理
  useEffect(() => {
    console.log('コンテキストの値が変化！', sharedData)
    // ここにコンテキストの値が変化した際に行いたい処理を記述します
  }, [context]) // sharedDataが変化するたびにuseEffectが実行されます

  console.log('context@parent', context)

  const sharedData = {
    message: 'Hello from Context!',
    // 他の共有したいデータや関数があればここに追加
  }

  useEffect(() => {
    // ここに再描画ごとに発火させたい処理を記述します
    console.log('コンポーネントが再描画されました！')
  }, [])

  const game = {
    focus: {
      basicCommandFocus: false,
      enemyInfoFocus: false,
      userInfoFocut: false,
    },
  }

  return (
    <GameContext.Provider value={context}>
      <div className='flex justify-center m-4'>
        <div className='bg-black w-[960px] h-[540px]'>
          <div className=' flex justify-center flex-col items-center'>
            {/* メニュー */}
            <BattleBar className={'w-[920px] h-[50px] mt-2'} />
            {/* <div className='bg-blue-600 w-[920px] h-[50px] mt-2 rounded-lg border-2 border-t-red-50'> */}

            {/* </div> */}
            {/* </div> */}

            {/* バトルフィールド */}
            {/* <div className='flex justify-center'> */}
            <BattleField className={'w-[920px] h-[320px]'} />
            {/* <div className='bg-gray-700 w-[920px] h-[320px]'>
              {/* enemy filed */}
            {/* nakama filed */}
            {/* </div> */}
            {/* </div> */}

            {/* コマンドメニュー */}
            <CommandMenu className={'w-[920px] h-[150px] mb-2'} />
            {/* <div className='flex justify-center m-8'> */}
            {/* <div className='flex bg-blue-600 w-[920px] h-[150px] mb-2 rounded-lg border-2 border-t-red-50'> */}
            {/* <div className='flex'> */}
            {/* <div className='flex-[0.8] h-full border-2 border-t-red-50'>
                  {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
            {/* </div> */}

            {/* <div className='flex-1 h-full border-2 border-t-red-50'> */}
            {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
            {/* </div> */}

            {/* <div className='flex-[2] h-full border-2 border-t-red-50'> */}
            {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </GameContext.Provider>
  )
}

export default GameWindow
