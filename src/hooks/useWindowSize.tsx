import React, { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width() {
      return window.innerWidth
    },
    height() {
      return window.innerHeight
    }
  })

  useEffect(() => {
    const changeWindowSize = () => setWindowSize({
      width() {
        return window.innerWidth
      },
      height(){
        return window.innerHeight
      }
    })
    window.addEventListener('resize', changeWindowSize)

    return () => window.removeEventListener('resize', changeWindowSize)
  }, [])

  return windowSize
}

export default useWindowSize