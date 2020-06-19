import React, { useState, useEffect } from 'react';
import apiConfig from './ApiKey';
import DayCard from './DayCard'
const WeekContainer = () => {

    const fullData = []
    const [dailyData, setdailyData] = useState([])
    const [id, setID] = useState('745044');
    const [selectedCity, setSelectedCity] = useState('İstanbul')

    const formatDayCards = () => {
        return dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }
    const getData = () => {
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${apiConfig.apiKey}`
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                const dailyDatas = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                fullData.push(data.list)
                setdailyData(dailyDatas)
            })
    }
    useEffect(() => {
        getData()
    });

    const handleChange = (e) => {
        setID(e.target.value)
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let cityName = el.getAttribute('id');
        setSelectedCity(cityName)
        getData()
    }

    return (
        <div className="container-fluid  ">
            <h1 className="display-5 jumbotron">5-Day Forecast.</h1>
            <div class='row'>
                <div class='col-lg-2 col-sm col-md-12'>
                    <h5>Şehirler</h5>
                    <hr />
                    <select style={{ padding: 5, margin: 10 }} value={selectedCity}
                        onChange={handleChange}>
                        <option style={{ padding: 5 }} value="745044">Şehir Seçin</option>
                        <option style={{ padding: 5 }} id='İstanbul' value="745044">İstanbul</option>
                        <option style={{ padding: 5 }} id='Ankara' value="323786">Ankara</option>
                        <option style={{ padding: 5 }} id='İzmir' value="311046">İzmir</option>
                        <option style={{ padding: 5 }} id='Bursa' value="750269">Bursa</option>
                    </select>
                </div>
                <div className="col col-lg-10 col-md-12 col-sm " style={{ float: 'left', paddig: '3%' }}>
                    <h5 className="display-5 text-muted">{selectedCity},TR</h5>
                    <hr />
                    <div class='row ' style={{ maxWidth: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        {formatDayCards()}
                    </div>


                </div>
            </div>
        </div >
    )

}

export default WeekContainer;