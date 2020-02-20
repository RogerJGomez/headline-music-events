import React from 'react'
import Event from './Event'


export default function Artist({events, artist}) {
    return (
        <>
        <div id="title">
            <h1>Próximos eventos de: {artist.name}</h1>
            <img src={artist.image_url} alt="artist"/>
        </div>

        <div className="flex-box">
            {
            events.map(event => {
                return(
                    <Event key={event.id} event={event} />
                )
            })
            }
        </div>
       </> 
    )
}
