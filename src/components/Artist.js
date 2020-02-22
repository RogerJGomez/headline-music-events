import React from 'react'
import Event from './Event'
import {Spinner, Grid, Cell} from 'react-mdl'

export default function Artist({events, artist, loading, error}) {

    if(loading){
        return(        
            <>

                <svg id="slit" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="slitPath2" d="M50 100 C49 80 47 0 40 0 L47 0 Z" />
                <path id="slitPath3" d="M50 100 C51 80 53 0 60 0 L53 0 Z" />
                <path id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
                </svg>
                <div className="spinner">
                <Spinner singleColor />
                </div>
                
           </> 
        ) 
    }
    else if(error){
        return(
        <>    

            <Grid style={{background:'#7118d7', color:'white'}}>

                <Cell col={12}>
                <div id="title">
                    <h3 style={{color:'white'}}>Artist not found</h3>
                </div>
                </Cell>

            </Grid>

            <svg id="slit" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="slitPath2" d="M50 100 C49 80 47 0 40 0 L47 0 Z" />
                <path id="slitPath3" d="M50 100 C51 80 53 0 60 0 L53 0 Z" />
                <path id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
            </svg>

        </>
        )
    }
    else if(events.length>0){

        return(
            <>

                <Grid style={{background:'#7118d7', color:'white'}}> 

                    <Cell col={12}>
                        <div id="title">
                            <img src={artist.image_url} alt="artist"/>
                            <h3>Upcoming events of: <strong>{artist.name}</strong></h3>
                        </div>
                    </Cell>

                </Grid>

                <svg id="slit" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path id="slitPath2" d="M50 100 C49 80 47 0 40 0 L47 0 Z" />
                    <path id="slitPath3" d="M50 100 C51 80 53 0 60 0 L53 0 Z" />
                    <path id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
                </svg>

                <Grid style={{margin:'0 5vw 5vw', padding:'2%', textAlign:'center'}}>
                    {
                    events.map(event => {
                        return(
                            <Event key={event.id} event={event}/>
                        )
                    })
                    }
                </Grid>

            </>
        )

    }
    else{
        return (
            <>

                <Grid style={{ background:'#7118d7', color:'white'}}>

                    <Cell col={12}>
                        <div id="title">
                            <h3 style={{color:'white'}}>{artist.name}</h3>
                            <img src={artist.image_url} alt="artist"/>
                            <h3>There are no upcoming events for the artist</h3>
                        </div>
                    </Cell>

                </Grid>

                <svg id="slit" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="slitPath2" d="M50 100 C49 80 47 0 40 0 L47 0 Z" />
                <path id="slitPath3" d="M50 100 C51 80 53 0 60 0 L53 0 Z" />
                <path id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
                </svg>

            </>
        )       
    }

}
