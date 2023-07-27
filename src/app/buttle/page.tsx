import Image from 'next/image'
import BattleBar from '../components/organisms/BattleBar'
import BattleField from '../components/organisms/BattleField'
import CommandMenu from '../components/organisms/CommandMenu'

const GameWindow = () => {
  return (
    <div className='flex justify-center m-4'>
      <div className='bg-black w-[960px] h-[540px]'>
        <div className=' flex justify-center flex-col items-center'>
            {/* メニュー */}
          <BattleBar className={'w-[920px] h-[50px] mt-2'}/>
            {/* <div className='bg-blue-600 w-[920px] h-[50px] mt-2 rounded-lg border-2 border-t-red-50'> */}

            {/* </div> */}
          {/* </div> */}

          {/* バトルフィールド */}
          {/* <div className='flex justify-center'> */}
          <BattleField className={'w-[920px] h-[320px]'}/>
            {/* <div className='bg-gray-700 w-[920px] h-[320px]'>
              {/* enemy filed */}
              {/* nakama filed */}
            {/* </div> */}
          {/* </div> */}

          {/* コマンドメニュー */}
          <CommandMenu className={'w-[920px] h-[150px] mb-2'}/>
          {/* <div className='flex justify-center m-8'> */}
            {/* <div className='flex bg-blue-600 w-[920px] h-[150px] mb-2 rounded-lg border-2 border-t-red-50'> */}
              {/* <div className='flex'> */}
                {/* <div className='flex-[0.8] h-full border-2 border-t-red-50'>
                  {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
                {/* </div> */}

                {/* <div className='flex-1 h-full border-2 border-t-red-50'> */}
                  {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
                {/* </div> */}

                {/* <div className='flex-[2] h-full border-2 border-t-red-50'> */}
                  {/* <div>たたかう</div>
                  <div>にげる</div>
                  <div>どうぐ</div>
                  <div>助ける</div> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default GameWindow
