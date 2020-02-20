import React from 'react'

export default function Event({event}) {
    return (
        <div className="flex-item">
            <h3>{event.venue.name}</h3>
            <h3>Ciudad: {event.venue.city} - {event.venue.country}</h3>
            <h3>Fecha: {event.datetime}</h3>
        </div>
    )
}
