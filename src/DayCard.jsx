
import React from 'react';
var moment = require('moment');

const DayCard = ({ reading }) => {
    const newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)

    const iconcode = reading.weather[0].icon;
    const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    const imgURL = `owf owf-${reading.weather[0].id} owf-5x`

    return (
        <div className="col-sm-12 col-md-5 col-lg " style={{ float: 'left', padding: '1%' }}>
            <div className="card" style={{ padding: 10, height: '100%' }}>
                <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={imgURL}></i>
                <h2>{Math.round(reading.main.temp)} °C</h2>
                <div id="icon"><img id="wicon" src={iconurl} alt="Weather icon" /></div>
                <div className="card-body">
                    <p className="card-text">{reading.weather[0].description}</p>
                </div>
            </div>
        </div>
    )
}

export default DayCard;