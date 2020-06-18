import React from 'react';
import apiConfig from './apiKey';
import DayCard from './DayCard'
class WeekContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullData: [],
            dailyData: [],
            citys: ['İstanbul', 'Ankara', 'İzmir'],
            id: 745044,
            selected: 'İstanbul'
        };


    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }
    getData = () => {
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?id=${this.state.id}&units=metric&appid=${apiConfig.apiKey}`

        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                console.log(data.list)
                this.setState({
                    fullData: data.list,
                    dailyData: dailyData
                }, () => console.log(this.state))
            })

    }
    componentDidMount = () => {


        console.log()
        { this.getData() }
    }

    handleChange = (e) => {
        this.setState({ selected: e.target.value });
        console.log(this.state.selected)
        if (this.state.selected == this.state.citys[0]) {
            this.setState({ id: 745044 })
        }
        if (this.state.selected == 'Ankara') {
            this.setState({ id: 323786 })
        }
        if (this.state.selected == 'İzmir') {
            this.setState({ id: 311046 })
        }
        if (this.state.selected == 'Bursa') {
            this.setState({ id: 750269 })
        }
        console.log(this.state.id)
        { this.getData() }
    }

    render() {
        return (
            <div className="container-fluid  ">
                <h1 className="display-5 jumbotron">5-Day Forecast.</h1>
                <div class='row'>
                    <div class='col-lg-2 col-sm col-md-12'>
                        <h5>Şehirler</h5>
                        <hr />
                        <select style={{ padding: 5, margin: 10 }} value={this.state.selected}
                            onChange={this.handleChange}>
                            <option style={{ padding: 5 }} value="Seçin">Şehir Seçin</option>
                            <option style={{ padding: 5 }} value="İstanbul">İstanbul</option>
                            <option style={{ padding: 5 }} value="Ankara">Ankara</option>
                            <option style={{ padding: 5 }} value="İzmir">İzmir</option>
                            <option style={{ padding: 5 }} value="Bursa">Bursa</option>
                        </select>
                    </div>
                    <div className="col col-lg-10 col-md-12 col-sm " style={{ float: 'left', paddig: '3%' }}>
                        <h5 className="display-5 text-muted">{this.state.selected},TR</h5>
                        <hr />
                        <div class='row ' style={{ maxWidth: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            {this.formatDayCards()}
                        </div>


                    </div>
                </div>
            </div >
        )
    }
}

export default WeekContainer;