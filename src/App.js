import React, { Component } from 'react'
import axios from 'axios'
import Artist from './components/Artist'

export default class App extends Component {

   constructor(){
     super()
     this.state = {
       events:[],
       artist:{},
       input:'',
       loading:true
     }
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
          loading:false
      })
        
      }))
      .catch(errors => {
        console.log(errors)
      })

  }

  render() {

      return (
        <div className="App" style={{textAlign:'center', marginTop:'40px'}}>
          <form onSubmit = {this.onSubmit}>
          <input type="text" />
          <button type="submit">Search</button>
          </form>
          <Artist events={this.state.events} artist={this.state.artist} />
        </div>
      )

  }
}


