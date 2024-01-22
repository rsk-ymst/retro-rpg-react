'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CharacterCard from '@/components/CharacterCard'
import { testPlayerData } from '@/game/player'

export default function Home() {
  const list = [
    { name: 'ショップ', path: '/shop' },
    { name: 'ガチャ', path: '/gacha' },
    { name: 'クエスト', path: '/quest' },
    { name: '編成', path: '/formation' },
    { name: '施設', path: '/facility' },
  ]

  const router = useRouter()

  return (
    <main className='flex flex-col items-center justify-between p-2'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <div className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 mt-0'>
          Get started by editing&nbsp;
          <code className='font-mono font-bold'>src/app/page.tsx</code>
        </div>
        <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
          <a
            className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 bg-white'
            href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{' '}
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              className='dark:invert'
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className='flex'>
        {testPlayerData.map((e, i) => {
          return <CharacterCard key={i} character={e} imageUrl={''} className={''} />
        })}
      </div>

      <div className='mb-8 w-full grid text-center lg:grid-cols-5 h-20'>
        {list.map((item, index) => {
          const isLastItem = index === list.length - 1

          return (
            <button
              key={index}
              className={`group rounded-lg border border-transparent px-5 py-4 h-[100px] bg-white transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
                isLastItem ? '' : 'mr-1'
              }`}
              onClick={() => router.push(item.path)}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </main>
  )
}
