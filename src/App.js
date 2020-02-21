import React, { Component } from 'react'
import axios from 'axios'
import Artist from './components/Artist'
import {Button, Textfield, Grid, Cell} from 'react-mdl'
import Fade from 'react-reveal/Fade'

export default class App extends Component {

      state = {
        events:[],
        artist:{},
        loading:true,
        error:false
      }

  componentDidMount(){

    let event = "https://rest.bandsintown.com/artists/Two%20Door%20Cinema%20Club/events?app_id=510"
    let artist = "https://rest.bandsintown.com/artists/Two%20Door%20Cinema%20Club?app_id=510"
    const requestOne = axios.get(event);
    const requestTwo = axios.get(artist); 

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0]
      const responseTwo = responses[1]   

      this.setState({
          events:responseOne.data,
          artist:responseTwo.data,
          loading:false
      })
      
    }))
    .catch(errors => {
      console.log(errors)
    })
  }

  onSubmit = (e) =>{

    this.setState({
      loading:true
    })
      e.preventDefault()
     let inputBand = e.target[0].value

      let event = `https://rest.bandsintown.com/artists/${inputBand}/events?app_id=510`
      let artist = `https://rest.bandsintown.com/artists/${inputBand}?app_id=510`
      const requestOne = axios.get(event);
      const requestTwo = axios.get(artist); 
  
      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        
        const responseOne = responses[0]
        const responseTwo = responses[1]

        this.setState({
          events:responseOne.data,
          artist:responseTwo.data,
          loading:false,
          error:false
        })
        
      }))
      .catch(errors => {

          this.setState({
              error:true,
              loading:false
          })
          console.log(errors)
      })
      e.target[0].value=''
  }



  render() {

      return (
        <div className="App">

          <form onSubmit = {this.onSubmit}>
          <Grid style={{background:'#7118d7', color:'white', paddingTop:'15vh'}}>
            
            <Cell col={4} style={{textAlign:'center'}}>
              <Fade left>
              <img src="/casete.png" alt="casete" height="150px"/>
              </Fade>
            </Cell>

            <Cell col={4} style={{textAlign:'center'}} >
              <div className="flex-box">
                <h3 id="search">Search an Artist</h3>
                <Textfield
                      label="Type the name of the artist"
                      style={{width: '400px'}}
                  />
                  <Button style={{margin:'10px'}}raised colored>Search <i className="fa fa-search" /></Button>
              </div>
            </Cell>
            <Cell col={4} style={{textAlign:'center'}}>
                <Fade right>
                <img id="logo2" src="/casete.png" alt="casete" height="150px"/>
                </Fade>
            </Cell>

          </Grid>
          </form>
          <Artist events={this.state.events} artist={this.state.artist} error={this.state.error} loading={this.state.loading}/>
        </div>
      )

  }
}


