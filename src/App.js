import React from "react";
import { useState, useEffect } from "react";

import Die from "./Die";

import { nanoid } from "nanoid";
export default function App() {
    const [load, setload] = useState(true);
    const [dice, setDice] = useState(newDie());
    const [gameWon,setGameWin] = useState(false)
    const [timer,setTimer] = useState(0)
    const[list,setList] = useState(() => {
      const save = localStorage.getItem('list');
      return save ? JSON.parse(save) : []
    })
    
    useEffect(() => {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue= dice[0].value;
     const allSameValue = dice.every(die => die.value === firstValue)
      if(allHeld && allSameValue) {
        setGameWin(true)
        setload(true)
        saveList()
      }
    }, [dice])
    
    
    useEffect(() => {
      let intervalId =null;
     if(!load) {
       intervalId = setInterval(() => {
         setTimer(pre => pre+1)
       },1000)
     }else {
       clearInterval(intervalId)
       setTimer(0)
     }
      return () => {
       clearInterval(intervalId)
      }
    }, [load])
    
    
    function newDie() {
        const dieArr = [];
        let num = 0;
        while (num < 10) {
            dieArr.push(generateDie());
            num++;
        }
        return dieArr;
    }
    function generateDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }
    function allNewDie() {
     setDice((oldDie) => (
     oldDie.map((die) => {
     return die.isHeld ? die : generateDie()
       
     })
     ))
    }
    
    
    function toggle(id) {
    setDice((oldDie) => (
     oldDie.map((die) => {
       return die.id === id ? {...die,isHeld:!die.isHeld} : die
       
     })
     ))
    }
    
    function statusHandel() {
     setDice(newDie())
      setload(false)
    }
    
    
    const dieElem = dice.map((item, i) => {
        return <Die
        key={i}
        value={item.value}
        id={item.id}
        isHeld={item.isHeld}
        toggle={() => toggle(item.id) }
        />;
    });
    
    function saveList() {
      const saveCurrentLs =[...list,timer];
      localStorage.setItem('list',JSON.stringify(saveCurrentLs));
      setList(saveCurrentLs)
    }
    
    return (
     <>
      {load && 
   <div  className='status-con'
   style={{background:gameWon ?'no-repeat linear-gradient(120deg,#cfc20b,#f2f2f2,#cfc20b)':'skyblue'}}>
   <div
   className='tag'
   >
   {gameWon ? <h1>You Win </h1> : <h2>Let roll the dice </h2>} 
   </div>
   <button 
   className='start-btn'
   onClick={statusHandel}
   >
   Start the game 
   </button>
   </div>
   }
         <div 
         className='container' >
         <div className='title'>
         <h1> TENZIES </h1>
         <p>
         Roll the dice untill to same All values 
         </p>
         </div>
         <h3> {timer}s </h3>
          <div 
          className='dice-con' >
            {dieElem}
            </div>
            <button 
            className='roll-btn'
            onClick={allNewDie}>
            Roll
            </button>
            <h4> History </h4>
            <ul>
            {list.map((item,i) => {
              return <li key={i} >
              Match {i+1} : {item}s
              </li>
            })}
            </ul>
            <button 
            onClick={() => {
              localStorage.clear()
              setList([])
              }}
              className='clear-btn'>
            Clear History
            </button>
         </div>
     </>
    );
}
