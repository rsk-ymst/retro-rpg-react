// import { Props } from "../molecules/BasicOptions"


export type Props = {
  className: string;
}

const BattleField = ({className}: Props) => {
  return (
    <div className={`bg-gray-700 ${className}`}>

    </div>
  )
}

export default BattleField
