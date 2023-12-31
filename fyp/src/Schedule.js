import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Schedule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./img/logo512.png";

export default function Schedule(){
    let counter = -1;
    let num = 0;
    let time_old = [];
    let time_new = [];
    let date_old = [];
    let date_new = [];
    const [show, setShow] = useState(false);
    const [schedule, setSchedule] = useState([]);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch(`http://ergast.com/api/f1/current.json`, requestOptions)
        .then(response => response.text())
        .then(response2 => JSON.parse(response2))
        .then(result => setSchedule(result))
        .catch(error => console.log('error', error));
      };
      fetchData();
    }, []);

    for (num=0; num < schedule.MRData?.RaceTable?.Races.length; num++) {
        time_old[num] = schedule.MRData?.RaceTable?.Races[num].time;
        time_new[num] = time_old[num].slice(0, 8);
        date_old[num] = schedule.MRData?.RaceTable?.Races[num].date;
        let a = date_old[num].slice(8, 10);
        a += date_old[num].slice(4, 7);
        a += "-";
        a += date_old[num].slice(0, 4);
        date_new[num] = a;
    }
    
    function Home(){
        window.location = "/"
    };

    function Schedule(){
        window.location = "/schedule"
    };

    function F1Live(){
        window.location = "/f1-live/fp1"
    };

    function Standings(){
        window.location = "/standings/drivers_champ"
    };

    function Information(){
        window.location = "/statistics/info_drivers"
    };

    return(
        <div>
            {show === true? 
                <>
                    <div id="sidenav">
                        <button className="closebtn" onClick={() => setShow(false)}>X</button>     
                        <img id='logo1' src={logo}/>
                        <a href="#" onClick={Home}>Home</a>
                        <a href="#" onClick={Schedule}>Schedule</a>
                        <a href="#" onClick={F1Live}>F1 Live</a>
                        <a href="#" onClick={Standings}>Standings</a>
                        <a href="#" onClick={Information}>Information</a>
                    </div>
                    <div id='title_side1'>
                        <h1 id='universe_side1'>F1 UNIVERSE</h1>
                    </div>
                </>
                : 
                <div id='title1'>
                    <button className='openBtn' onClick={() => setShow(true)}>&#9776; Open</button>
                    <h1 id='universe1'>F1 UNIVERSE</h1>
                </div>
            }
            <br></br>
            <Table id='table_standings' style={{ border: "1px solid black", borderCollapse: "collapse", width: "70%", margin: "auto", backgroundColor: "#fff0f0", fontSize: "20px"}}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Race Name</th>
                        <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Date</th>
                        <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Time UTC</th>
                        <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Circuit</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.MRData?.RaceTable?.Races.map((element, index) => {
                        counter = counter + 1;
                        return (
                            <tr>
                                <td key={element.raceName} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                                    <Link to={{pathname:`/schedule/${index+1}`, state:{circuitId:index+1}}}>{element.raceName}</Link>
                                </td>
                                <td key={element.date} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                                    {date_new[counter]}
                                </td>
                                <td key={element.time} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                                    {time_new[counter]}
                                </td>
                                <td key={element.Circuit.circuitName} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                                    {element.Circuit.circuitName}
                                </td>
                            </tr>
                        )
                        }  )}
                </tbody>
            </Table>
            <br></br>
        </div>
    )
}
