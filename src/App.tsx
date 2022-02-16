import React, { useState, useEffect } from 'react';
import useWindowSize from './hooks/useWindowSize'

const BOX_SIZE = 200
const speedBouncing = 1
const deviation = speedBouncing
let direction = 'bottom' 
let xDirection = 'right'

function App() {
  const { width, height } = useWindowSize()
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  })
  const [x, setX] = useState(0)

  useEffect(() => {
    const startIntervalBouncing = setInterval(() => { 
      setX((prev) => {
        if(xDirection === 'right') {
          if(prev + BOX_SIZE > width()) {
            xDirection = 'left'
            return prev - deviation
          }

          return prev + deviation
        }
        if(xDirection === 'left') {
          if(prev <= 0) {
            xDirection = 'right'
            return prev + deviation
          } 

          return prev - deviation
        }
        return prev + deviation
      })
      setBoxPosition((prev) => {
        if(direction === 'bottom'){
          if(prev.y + BOX_SIZE > height()){
            direction = 'top'
            return {
              ...prev,
              y: prev.y - speedBouncing,
            }
          }
          return {
           ...prev,
            y: prev.y + speedBouncing,
          }
        }
        if(direction === 'top'){
          if(prev.y < 0){
            direction = 'bottom'
            return {
              ...prev,
              y: prev.y + speedBouncing
            }
          }
          return {
            ...prev,
            y: prev.y - speedBouncing
          }
        }

        return {
          ...prev,
          y: prev.y + speedBouncing
        }
      })   
    }, 10)

    return () => clearInterval(startIntervalBouncing)
  }, [])
  
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden' 
      }}
    >
      <pre>{JSON.stringify({ width: width(), height: height() }, null, 2)}</pre>
      <div
        style={{
          backgroundColor: 'black',
          width: BOX_SIZE,
          height: BOX_SIZE,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translateY(${boxPosition.y}px) translateX(${x}px)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >{boxPosition.y}</div>
    </div>
  );
}

export default App;