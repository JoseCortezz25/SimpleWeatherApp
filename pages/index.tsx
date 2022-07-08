import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import NotFound from '../components/NotFound/NotFound'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [data, setData] = useState({}) as any
  const [search, setSearch] = useState('');
  const [error, setError] = useState({error: false, message: ''});
  const cities = ['London', 'Tokyo', 'Paris', 'Rome', 'Washington D.C.', 'Berlin', 'Buenos Aires', 'Bangkok', 'Cape Town', 'Wellington', 'Bogota', 'Neiva', 'Quito', 'Tórshavn', 'Saint Peter Port', 'Dublin', 'Saint Helier', 'Lisbon', 'Belgrade', 'Madrid', 'Città del Vaticano', 'The Valley', 'Brasília']


  const getResultWeather = (city: String) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404' || json.cod === '400'){
        setError({error: true, message: json.message}) 
      } else {
        setError({error: false, message: ''})
      }
      console.log(json);
      setData(json);
    })
    .catch(err => console.log('Solicitud fallida', err));
  }

  useEffect(() => {
    let numberRandom = Math.round(Math.random() * cities.length)
    getResultWeather(cities[numberRandom])
  }, [])
  
  
  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      getResultWeather(search)
    }
  }

  const kelvinToCelcius = (temp: number) => {
    let newTemp = temp - 273.15
    return Math.round(newTemp)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Weather App</title>
        <meta name="description" content="The nicest weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container__info}>
        <div className={styles['box__top']}>
          <p className={styles.initialText}>Right now
            <input
              type="text"
              className={styles.inputSearch}
              onChange={({ target }) => setSearch(target.value)}
              placeholder="Enter Location"
              onKeyPress={handleSearch}
            />
            , it is {data.weather ? data.weather[0].main : null}
          </p>
        </div>

        {error.error ? <NotFound message={error.message}/> : (
        <div className={styles['box__info']}>
          <div className={styles.temp}>
            {data.main ? <p>{kelvinToCelcius(data.main.temp)} °C</p> : null}
          </div>
          <div className={styles.location}>
            <h1>{data.name} - {data.sys ? data.sys.country : null}</h1>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom__item}>
              {data.main ? <p className={styles.subvalue__item}>{kelvinToCelcius(data.main.feels_like)} °C</p> : null}
              <p className={styles.subtitle__item}>Feels</p>
            </div>
            <div className={styles.bottom__item}>
              {data.main ? <p className={styles.subvalue__item}>{data.main.humidity}%</p> : null}
              <p className={styles.subtitle__item}>Humidity</p>
            </div>
            <div className={styles.bottom__item}>
              {data.wind ? <p className={styles.subvalue__item}>{data.wind.speed} MPH</p> : null}
              <p className={styles.subtitle__item}>Wind</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div >
  )
}

export default Home
