export type ItemProps = {
  itemName: string
  itemValue: string
}

const ParameterItem = ({ itemName, itemValue }: ItemProps) => {
  return (
    <div className='flex justify-between'>
      <div className='w-[50px] bg-slate-300 pl-2 font-bold'>{itemName}</div>
      <div className='w-[50px] bg-slate-200 flex justify-center font-bold'>{itemValue}</div>
    </div>
  )
}

export default ParameterItem
