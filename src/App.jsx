import React from 'react'
import { useRef } from 'react';
import { pokemons } from './utils/pokemons'

const MATCH = Math.floor(Math.random() * pokemons.length);


export default function Pokeguess() {
  const [hasWon, setHasWon] = React.useState(false)
  const [start, setStart] = React.useState(false)
  const [wrong, setWrong] = React.useState(false)

  const pokemonRef = useRef(null)

  console.log(pokemons[MATCH].name)
  const handleSubmit = (event) => {
    setStart(true)
    event.preventDefault()
    const { pokemon } = event.currentTarget

    if (pokemon.value.toLowerCase().trim() === pokemons[MATCH].name) {
      setHasWon(true)
      setWrong(false)
    } else {
      setWrong(true)
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


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
      <img src='/who.png' height={100} alt='' />
      <img src='/pokemon.png' height={100} alt='' />
      <div className='' style={{ margin: '30px' }}>
        {start &&
          (<>{wrong ?
            (<span className='error'>Try Again</span>) :
            (<span className='success'>You Won!</span>)}</>)
        }
      </div>
      <div
        className='pokemon'
        ref={pokemonRef}
        onMouseMove={mouseMove}
        onMouseOut={mouseOut}
      >
        <img
          height={300}
          width={300}
          src={pokemons[MATCH].image}
          style={{ imageRendering: 'pixelated', filter: hasWon ? 'none' : 'brightness(0)' }}
        />
      </div>

      {hasWon ? (
        <div className="form">
          <button style={{ width: '100%' }} className='' onClick={() => location.reload()} autoFocus>Play again</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <div className=''>
            <input type='text' name='pokemon' className='' autoFocus />
          </div>
          <button type='submit' className=''>Guess</button>
        </form>
      )}

    </div>
  )
}

