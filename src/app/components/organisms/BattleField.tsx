// import { Props } from "../molecules/BasicOptions"

import EnemyArea from '../molecules/EnemyArea'
import FieldPlayerArea from '../molecules/FieldPlayerArea'

export type Props = {
  className: string
}

const BattleField = ({ className }: Props) => {
  return (
    <div className={`bg-gray-400 ${className} bg-battle `}>
      <div className='flex h-full bg-gray-400 bg-opacity-70'>
        <EnemyArea className='h-full flex-1' />
        <FieldPlayerArea className='h-full flex-1' />
      </div>
    </div>
  )
}

export default BattleField
