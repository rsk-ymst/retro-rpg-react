export type Props = {
  className: string
}

const CommandMenu = ({ className }: Props) => {
  return (
    // <div className={}>
    <div className={`flex bg-blue-600 rounded-lg border-2 border-t-red-50 ${className}`}>
      {/* <div className='flex'> */}
      <div className='flex-[0.8] h-full border-2 border-t-red-50'>
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      </div>

      <div className='flex-1 h-full border-2 border-t-red-50'>
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      </div>

      <div className='flex-[2] h-full border-2 border-t-red-50'>
        {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
      </div>
      {/* </div> */}
    </div>
    // </div>
  )
}

export default CommandMenu
