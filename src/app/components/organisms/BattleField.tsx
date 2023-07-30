// import { Props } from "../molecules/BasicOptions"

import EnemyArea from "../molecules/EnemyArea";
import FieldPlayerArea from "../molecules/FieldPlayerArea";


export type Props = {
  className: string;
}

const BattleField = ({className}: Props) => {
  return (
    <div className={`bg-gray-400 ${className}`}>
      <div className="flex h-full ">
        <EnemyArea className="h-full flex-1"/>
        <FieldPlayerArea className="h-full flex-1"/>
      </div>
    </div>
  )
}

export default BattleField
