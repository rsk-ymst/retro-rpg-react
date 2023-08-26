import { useContext } from 'react'
import { Context } from '@/game/context'

export type Props = {
  className: string
}

const BattleBar = ({ className }: Props) => {
  const context = useContext(Context)
  if (!context) throw new Error('enemy context error')

  return (
    <>
      <div className={`${className}`}>
        {context.battleBarContent && (
          <div
            className={`bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border-2 border-t-red-50 flex items-center justify-center  h-[50px]`}
          >
            <div className='text-white mb-1'>{context.battleBarContent}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default BattleBar
