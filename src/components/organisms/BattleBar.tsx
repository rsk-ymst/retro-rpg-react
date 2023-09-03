import { useContext } from 'react'
import { BattleState, Context } from '@/game/context'

export type Props = {
  className: string
}

const BattleBar = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('enemy context error')

  const isPlayingBGM = context.isPlayingBGM

  return (
    <>
      <div className={`${className}`}>
        {context.battleBarContent ? (
          <div
            className={`bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border-2 border-t-red-50 flex items-center justify-center  h-[50px]`}
          >
            <div className='text-white mb-1'>{context.battleBarContent}</div>
          </div>
        ) : (
          <div className='w-full'>
            <button
              className={`${
                isPlayingBGM ? 'bg-blue-400' : 'bg-red-400'
              } text-white w-30 mt-1 rounded-md justify-start pb-1 px-2 text-center`}
              onClick={() => {
                if (isPlayingBGM) {
                  context.mainBGMRef.current?.pause()
                  context.winBGMRef.current?.pause()
                } else {
                  if (context.battleState === BattleState.PlayerWin)
                    context.winBGMRef.current?.play()
                  else context.mainBGMRef.current?.play()
                }

                context.updateIsPlayingBGM(!context.isPlayingBGM)
              }}
            >
              {isPlayingBGM ? 'STOP BGM' : 'PLAY BGM'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default BattleBar
