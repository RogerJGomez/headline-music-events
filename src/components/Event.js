import React from 'react'
import { Cell } from 'react-mdl'
import { Fade } from 'react-reveal'

export default function Event({event}) {

       const FormatDate = () => {

          const date = new Date(event.datetime).toDateString()
          return(date)

       }

        return (
            
            <Cell col={4}>

                <Fade right>

                    <div className="event">

                        <h3>{event.venue.name}</h3>
                        <h4>{event.venue.city} - {event.venue.country}</h4>
                        <h4>{FormatDate()}</h4>
                        <a href={event.url} target="_blank" rel="noopener noreferrer" className="mdl-button mdl-js-button mdl-button mdl-button--raised mdl-button--colored">Get 
                            Tickets <i className="fa fa-ticket" style={{color: '#F3B904'}}/>
                        </a>

                    </div>

                </Fade>

            </Cell>

        )
}
