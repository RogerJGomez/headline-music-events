import React from "react";
import Event from "./Event";
import { Spinner, Grid, Cell } from "react-mdl";
import Border from "./Border";

const mainStyles = {
  background: "#7118d7", color: "white"
}

export default function Artist({ events, artist, loading, error }) {
  if (loading) {
    return (
      <>
        <div className="spinner">
          <Spinner singleColor />
        </div>
        <Border />
      </>
    );
  } else if (error) {
    return (
      <>
        <Grid style={mainStyles}>
          <Cell col={12}>
            <div id="title">
              <h3 style={{ color: "white" }}>Artist not found</h3>
            </div>
          </Cell>
        </Grid>
        <Border />
      </>
    );
  } else if (events.length > 0) {
    return (
      <>
        <Grid style={mainStyles}>
          <Cell col={12}>
            <div id="title">
              <img draggable="false" src={artist.image_url} alt="artist" />
              <h3>
                Upcoming events of: <strong>{artist.name}</strong>
              </h3>
            </div>
          </Cell>
        </Grid>
        <Border />
        <Grid style={{margin:"0 5%"}}>
          {events.map((event) => {
            return <Event key={event.id} event={event} />;
          })}
        </Grid>
      </>
    );
  } 
  return (
    <>
      <Grid style={mainStyles}>
        <Cell col={12}>
          <div id="title">
            <h3 style={{ color: "white" }}>{artist.name}</h3>
            <img src={artist.image_url} alt="artist" />
          </div>
        </Cell>
      </Grid>
      <Border />
      <div className="event no-events">
        <h3>There are no upcoming events for the artist</h3>
      </div>
    </>
  );
}
