import React from 'react'

export default function Die({value,id,isHeld,toggle}) {
  return (
    <div
    onClick={() => toggle(id)}
    className='dice'
    style={
      {
         background: isHeld ? 'skyblue' : '#fff'
      }}
    >
    <img src="./public/images/dieFace{value}.png" alt="dice"/>
    </div>
  )
}