export type Props = {
  className: string
}

const BattleBar = ({ className }: Props) => {
  return (
    <div
      className={`bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border-2 border-t-red-50 ${className}`}
    ></div>
  )
}

export default BattleBar
