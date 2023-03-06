import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { pokemons } from './utils/pokemons'
import { colors } from './utils/colors';

const MATCH = Math.floor(Math.random() * pokemons.length);



export default function Pokeguess() {
  const [hasWon, setHasWon] = React.useState(false)
  const [start, setStart] = React.useState(false)
  const [wrong, setWrong] = React.useState(false)
  const [showInput, setShowInput] = React.useState(false)

  const pokemonRef = useRef(null)
  console.log(pokemons[MATCH].name)

  const handleSubmit = (event) => {
    setStart(true)
    event.preventDefault()
    const { pokemon } = event.currentTarget

    if (pokemon.value.toLowerCase().trim() === pokemons[MATCH].name) {
      setHasWon(true)
      setWrong(false)
      setShowInput(true)
    } else {
      setWrong(true)
      pokemon.value = ''
      setShowInput(false)
      pokemon.autofocus = true
    }
  }

  const mouseMove = (event) => {
    const height = pokemonRef.current.clientHeight;
    const width = pokemonRef.current.clientWidth;

    const { layerX, layerY } = event.nativeEvent;
    const yRotation = ((layerX - width / 2) / width) * 12;
    const xRotation = -((layerY - height / 2) / height) * 12;

    const string = `perspective(500px) scale(1.06) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    pokemonRef.current.style.transform = string;
  }

  const mouseOut = () => {
    pokemonRef.current.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
  }

  useEffect(() => {
    if (pokemonRef.current) {
      pokemonRef.current.style.backgroundColor = colors[pokemons[MATCH].type]
    }
  }, [pokemonRef.current])

  return (
    <div className='main'>
      <img src='/who.png' className='wtp' alt='' />
      <img src='/pokemon.png' className='wtp' alt='' />

      <div style={{ marginTop: '15px', height: '30px' }}>
        {start &&
          (<>{wrong ?
            (<span className='alert error'>Try Again</span>) :
            (<span className='alert success'>You Won!</span>)}</>)
        }
      </div>

      <div className='pokemonWrapper' ref={pokemonRef} onMouseMove={mouseMove} onMouseOut={mouseOut} >
        <img src={pokemons[MATCH].image} alt='pokemon image' className='pokemon' style={{ filter: hasWon ? 'none' : 'brightness(0)' }} />
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input type='text' name='pokemon' disabled={showInput} autoFocus /> 
        {hasWon ? (
          <button className='btn' onClick={() => location.reload()} autoFocus style={{ backgroundColor: `${colors[pokemons[MATCH].type]}` }}>Play again</button>
        ) : (
          <button className='btn' type='submit' style={{ backgroundColor: `${colors[pokemons[MATCH].type]}` }}>Guess</button>
        )}
      </form>
    </div>
  )
}

