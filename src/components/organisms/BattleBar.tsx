export type Props = {
  className: string
}

const BattleBar = ({ className }: Props) => {
  return (
    <div
      className={`${className}`}
    ></div>
  )
}

export default BattleBar
