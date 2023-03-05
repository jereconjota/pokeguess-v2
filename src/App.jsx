import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { pokemons } from './utils/pokemons'

const MATCH = Math.floor(Math.random() * pokemons.length);

const colors = {
  normal: "#C4C4A4",
  fire: "#F08030",
  fighting: "#C03028",
  water: "#6890F0",
  flying: "#A890F0",
  grass: "#78C850",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  psychic: "#F85888",
  rock: "#B8A038",
  ice: "#98D8D8",
  bug: "#A8B820",
  dragon: "#7038F8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
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
      // pokemonRef.current.style.background = `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${ colors[pokemons[MATCH].type] } 100%)`
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

