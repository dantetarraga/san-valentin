import React, { useState, useEffect } from 'react'
import { Heart, Sparkles, Stars, PartyPopper, Frown } from 'lucide-react'

const valentineGifs = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd3b2E2OWJ0MmgydWF4NnBxbXF4Ynhxd2t2aXIyenR6YnB0NXV6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW11MXZqNHU4eG82aDF0ZnhpajNoZWZlMGxyZGllOW5rNTg2NjA5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif',
  'https://media.giphy.com/media/BLJy2x6QwzgdrCfAlD/giphy.gif?cid=ecf05e479u5yhvuh73k8o2uyk3qu1zvnyc9rvzb41o25p667&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/Txh1UzI7d0aqs/giphy.gif?cid=ecf05e472ul8s9hm60ovrp7h77lma2kcpaa1xjtyxtq0qa16&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/Q6WPVzFU8LcBWWgQE1/giphy.gif?cid=ecf05e47haddu4rxvu6yzpk4drroj1wepnfllkb74dn4scsg&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/kDCf1twUEIAmLlrzfZ/giphy.gif?cid=ecf05e47q1qa6t3fhnr9qxrx9q14g3o83lklde3tol3ullf9&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/2rtQMJvhzOnRe/giphy.gif?cid=ecf05e47xsa5n2niodshrv4ksok8qgsz9nlfn0s1fnlztro8&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/fkKORiZTUQvhC/giphy.gif?cid=ecf05e47bjxpao5hco2q9mtmu13k5tnxb45df79wkh3vddg5&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/c4nvIJnKbk8e8T3dhG/giphy.gif?cid=ecf05e4774knyk04x1mdnjzez5ic8ofrb7wy3w42wmczop97&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/NSXDAJ1PQow4xHZCAM/giphy.gif?cid=ecf05e4774knyk04x1mdnjzez5ic8ofrb7wy3w42wmczop97&ep=v1_gifs_search&rid=giphy.gif&ct=g'
]

const phrases = [
  '¿Por favor? 🥺',
  '¡No me hagas esto! 😭',
  '¡Vamos, di que sí! 🙏',
  '¡Mira qué lindos GIFs! 😊',
  '¡No seas malita! 💝',
  '¡Te prometo una refri llena! ✨',
  '¡Me vas a hacer llorar! 😢',
  '¡Dame una oportunidad! 🌹',
  '¡Ya no te hare enojar! 🙈',
  '¡Por favor, por favor! 🙏',
]

function App() {
  const [currentGifIndex, setCurrentGifIndex] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showCelebration, setShowCelebration] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [scale, setScale] = useState(1)
  const [sadFaces, setSadFaces] = useState<
    { id: number; x: number; y: number }[]
  >([])

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.1 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleNoButtonMove = () => {
    const maxX = window.innerWidth - 100
    const maxY = window.innerHeight - 50
    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    const newFaces = Array.from({ length: 35 }).map(() => ({
      id: Date.now() + Math.random(), // Generar un ID único
      x: noButtonPosition.x + Math.random() * 160 - 40, // Desplazar ligeramente desde la posición X del botón
      y: noButtonPosition.y + Math.random() * 160 - 40, // Desplazar ligeramente desde la posición Y del botón
    }));
    
    setSadFaces(() => [...newFaces])

    // Remove old faces after animation
    setTimeout(() => {
      setSadFaces((prev) => prev.slice(1))
    }, 2000)

    setNoButtonPosition({ x: newX, y: newY })
    setCurrentGifIndex((prev) => (prev + 1) % valentineGifs.length)
    setNoCount((prev) => prev + 1)
  }

  const handleYesClick = () => {
    setShowCelebration(true)
  }

  useEffect(() => {
    if (showCelebration) {
      const timeout = setTimeout(() => {
        setShowCelebration(false)
      }, 8000)
      return () => clearTimeout(timeout)
    }
  }, [showCelebration])

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-red-100 to-purple-100'>
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(30)].map((_, i) => (
          <React.Fragment key={i}>
            <Heart
              className='absolute animate-float text-pink-300/30'
              size={45}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            />
            <Stars
              size={45}
              className='absolute animate-pulse text-yellow-300/30'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 15 + 8}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
            <Sparkles
              size={45}
              className='absolute animate-spin text-purple-300/30'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 6}px`,
                animationDuration: `${Math.random() * 8 + 4}s`,
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {sadFaces.map((face) => (
        <Frown
          key={face.id}
          size={24}
          className='absolute text-gray-400 animate-sad-float'
          style={{
            left: face.x,
            top: face.y,
            fontSize: '24px',
          }}
        />
      ))}

      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen gap-10 p-4 sm:p-6 md:p-8'>
        <h1
          className='px-4 mb-4 text-3xl font-bold text-center text-transparent sm:text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 sm:mb-6 md:mb-8'
          style={{
            transform: `scale(${scale}))`,
            transition: 'all 0.5s ease-in-out',
          }}
        >
          ¿Quieres ser mi San Valentín? 💖
        </h1>

        <div className='w-full max-w-xs gap-5 mx-auto sm:max-w-sm md:max-w-md sm:mb-6 md:mb-8'>
          <div className='bg-white rounded-2xl p-3 shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_3px_rgba(0,0,0,0.05)] transform transition-all hover:scale-105 hover:rotate-2'>
            <div className='relative w-full h-full mx-auto overflow-hidden rounded-xl'>
              <img
                src={valentineGifs[currentGifIndex]}
                alt='Valentine'
                className='object-cover w-full h-full'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center w-full max-w-md gap-4 px-4 mx-auto sm:max-w-sm sm:flex-row'>
          <button
            onClick={handleYesClick}
            className='relative px-8 py-4 text-lg font-bold text-white transition-all transform rounded-lg shadow-lg md:w-full sm:w-auto group bg-gradient-to-r from-pink-500 to-purple-500 sm:text-xl hover:scale-110 hover:rotate-3 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'
          >
            <span className='absolute inset-0 w-full h-full transition-opacity rounded-lg opacity-0 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:opacity-20'></span>
            ¡Sí! 💖
          </button>

          <button
            onClick={handleNoButtonMove}
            className='px-8 py-4 text-lg font-bold text-white transition-all transform bg-gray-500 rounded-lg shadow-lg md:w-full sm:w-auto sm:text-xl hover:scale-110 hover:bg-gray-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            style={{
              position: noCount > 0 ? 'fixed' : 'relative',
              left: noButtonPosition.x,
              top: noButtonPosition.y,
            }}
          >
            No 😢
          </button>
        </div>

        {noCount > 0 && (
          <p className='px-4 mt-4 text-lg font-semibold text-center text-pink-600 sm:text-xl animate-bounce'>
            {phrases[noCount % phrases.length]}
          </p>
        )}

        {showCelebration && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-pink-500/40 to-purple-500/40 backdrop-blur-sm'>
            <div className='max-w-md p-6 mx-auto text-center transform shadow-2xl sm:p-8 bg-white/30 rounded-3xl backdrop-blur-md animate-celebration'>
              <PartyPopper className='w-12 h-12 mx-auto mb-4 text-yellow-400 sm:w-16 sm:h-16 animate-spin' />
              <h2 className='mb-4 text-3xl font-bold text-white sm:text-4xl md:text-6xl animate-bounce'>
                ¡¡¡Síiiiii!!! 🎉
              </h2>
              <p className='text-xl text-white sm:text-2xl'>
                ¡Sabía que dirías que sí! ¡Feliz San Valentín! ❤️
              </p>
              <div className='flex justify-center gap-4 mt-4'>
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className='text-pink-400 animate-bounce'
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
