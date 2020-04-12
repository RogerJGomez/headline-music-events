import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Artist from './components/Artist'
import { Button, Textfield, Grid, Cell, Header, Navigation } from 'react-mdl'
import { Lines } from 'react-preloaders'
import LeftLogo from './components/LeftLogo'
import RightLogo from './components/RightLogo'

const iconStyle = {display:'flex', alignItems:'center', justifyContent:'center'}

export default function App() {

  const [artist, setArtist] = useState({})
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [preLoader, setPreLoader] = useState(false)

  useEffect(() => {
    let event = "https://rest.bandsintown.com/artists/The%20Kooks/events?app_id=510"
    let artist = "https://rest.bandsintown.com/artists/The%20Kooks?app_id=510"
    const requestOne = axios.get(event)
    const requestTwo = axios.get(artist)

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const eventsData = responses[0].data
      const artistData = responses[1].data  
    
      setArtist(artistData)
      setEvents(eventsData)
      setLoading(false)
      setPreLoader(false)
      
    }))
    .catch(errors => {
      console.log(errors)
      setLoading(false)
      setPreLoader(false)
      setError(true)
    })
  }, [])


  function onSubmit (e){
    e.preventDefault()

      setLoading(true)
      let artistName = e.target[0].value
      let event = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=510`
      let artist = `https://rest.bandsintown.com/artists/${artistName}?app_id=510`
      const requestOne = axios.get(event)
      const requestTwo = axios.get(artist)
  
      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => { 
        const eventsData = responses[0].data
        const artistData = responses[1].data  
      
        setArtist(artistData)
        setEvents(eventsData)
        setLoading(false)
      }))
      .catch(errors => {
        console.log(errors)
        setLoading(false)
        setError(true)
      })

      e.target[0].value = ''
  }

  return (
    <>
    <div className="App">
      <Header title="Headline Music Events" style={{color: 'white', background:'#272727'}}>
          <Navigation>
              <a href="https://github.com/rogerjgomez" style={{lineHeight:0}}><i className="fa fa-github nav-icon"/></a>
          </Navigation>
      </Header>

      <form onSubmit = {onSubmit}>
        <Grid style={{background:'#7118d7', color:'white', paddingTop:'5vh'}}>
          <Cell col={4} style={iconStyle}>
              <LeftLogo />
          </Cell>

          <Cell col={4} style={{textAlign:'center'}} id="search-form-">
            <div className="flex-box">
              <h3 id="search">Search an Artist</h3>
                <Textfield
                    label="Search by name"
                    style={{width: '400px'}}
                    floatingLabel
                />
                <Button style={{margin:'10px'}}raised colored>Search <i className="fa fa-search" /></Button>
            </div>
          </Cell>

          <Cell col={4} style={iconStyle}>
              <RightLogo />
          </Cell>
        </Grid>
      </form>
      <Artist events={events} artist={artist} error={error} loading={loading}/>
    </div>
    <Lines customLoading={preLoader} background="#00af9a" color={'#7118d7'}/>
  </>  
  )
}




