import React, { Component } from 'react'
import axios from 'axios'
import Artist from './components/Artist'
import { Button, Textfield, Grid, Cell, Header, Navigation } from 'react-mdl'
import { Fade } from 'react-reveal'
import { Lines } from 'react-preloaders'


const iconStyle = {display:'flex', alignItems:'center', justifyContent:'center'}


export default class App extends Component {

      state = {

        events:[],

        artist:{},

        loading:true,

        error:false,

        preloader:true

      }

  componentDidMount(){

    let event = "https://rest.bandsintown.com/artists/The%20Kooks/events?app_id=510"

    let artist = "https://rest.bandsintown.com/artists/The%20Kooks?app_id=510"

    const requestOne = axios.get(event);

    const requestTwo = axios.get(artist); 

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {

      const responseOne = responses[0]

      const responseTwo = responses[1]   

      this.setState({

          events:responseOne.data,

          artist:responseTwo.data,

          loading:false,

          preloader:false

      })
      
    }))
    .catch(errors => {

      console.log(errors)

        this.setState({

          loading:false,

          preloader:false
          
      })

    })

  }

  onSubmit = e =>{

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

      e.target[0].value = ''
      
  }



  render() {

      return (
      <>
        <div className="App">

          <Header title="Headline Music Events" style={{color: 'white', background:'#272727'}}>

              <Navigation >
                  <a href="https://github.com/rogerjgomez" style={{lineHeight:0}}><i className="fa fa-github nav-icon"/></a>
              </Navigation>

          </Header>

          <form onSubmit = {this.onSubmit}>

            <Grid style={{background:'#7118d7', color:'white', paddingTop:'5vh'}}>
              
              <Cell col={4} style={iconStyle}>
                <Fade left>
                  <img className="music-icon" src="/left-icon.svg" alt="left"/>
                </Fade>
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
                  <Fade right>
                    <img className="icon music-icon" src="/right-icon.svg" alt="right"/>
                  </Fade>
              </Cell>

            </Grid>
          
          </form>

          <Artist events={this.state.events} artist={this.state.artist} error={this.state.error} loading={this.state.loading}/>

        </div>

        <Lines customLoading={this.state.preloader} background="#00af9a" color={'#7118d7'}/>

      </>  
      )

  }
}


