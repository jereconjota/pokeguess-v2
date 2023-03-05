import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { pokemons } from './utils/pokemons'

const MATCH = Math.floor(Math.random() * pokemons.length);

const colors = {
  normal: "rgb(196, 196, 164, 0.7)",
  fire: "rgb(240, 128, 48, 0.7)",
  fighting: "rgb(192, 48, 40, 0.7)",
  water: "rgb(104, 144, 240, 0.7)",
  flying: "rgb(168, 144, 240, 0.7)",
  grass: "rgb(120, 200, 80, 0.7)",
  poison: "rgb(160, 64, 160, 0.7)",
  electric: "rgb(248, 208, 48, 0.7)",
  ground: "rgb(224, 192, 104, 0.7)",
  psychic: "rgb(248, 88, 136, 0.7)",
  rock: "rgb(184, 160, 56, 0.7)",
  ice: "rgb(152, 216, 216, 0.7)",
  bug: "rgb(168, 184, 32, 0.7)",
  dragon: "rgb(112, 56, 248, 0.7)",
  ghost: "rgb(112, 88, 152, 0.7)",
  dark: "rgb(112, 88, 72, 0.7)",
  steel: "rgb(184, 184, 208, 0.7)",
  fairy: "rgb(238, 153, 172, 0.7)",
}


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
  }, [ pokemonRef.current ])



  return (
    <div className='main'>
      <img src='/who.png' className='wtp' alt='' />
      <img src='/pokemon.png' className='wtp' alt='' />

      <div style={{ marginTop: '15px', height:'20px' }}>
        {start &&
          (<>{wrong ?
            (<span className='alert error'>Try Again</span>) :
            (<span className='alert success'>You Won!</span>)}</>)
        }
      </div>

      <div className='pokemonWrapper' ref={pokemonRef} onMouseMove={mouseMove} onMouseOut={mouseOut}>
        <img src={pokemons[MATCH].image} alt='pokemon image' className='pokemon' style={{ filter: hasWon ? 'none' : 'brightness(0)' }} />
      </div>


      <form onSubmit={handleSubmit} className="form">
        <div className=''>
          <input type='text' name='pokemon' className='' autoFocus disabled={showInput} />
        </div>
        {hasWon ? (
          <button className='btn' onClick={() => location.reload()} autoFocus>Play again</button>
        ) : (
          <button className='btn' type='submit' autoFocus>Guess</button>
        )}
      </form>

    </div>
  )
}

