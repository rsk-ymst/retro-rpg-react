

export type Props = {
  className: string;
}

const BattleBar = ({className}: Props) => {
  return (
    <div className={`bg-blue-600 rounded-lg border-2 border-t-red-50 ${className}`}>

    </div>
  )
}

export default BattleBar
