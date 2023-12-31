import React, {useEffect, useState} from 'react';
import './Standings.css';
import {Table, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./img/logo512.png";

function Standings(){
  const [show, setShow] = useState(false) 
  const [results, setResults] = useState([]);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://ergast.com/api/f1/current/driverStandings.json`, requestOptions)
      .then(response => response.text())
      .then(response2 => JSON.parse(response2))
      .then(result => setResults(result))
      .catch(error => console.log('error', error));
    };
    fetchData();
  }, []);

  function pageRefresh() {
      window.location.reload(false);
  };

  function openConstructors() {
      window.location = "/standings/constructors_champ"
  };

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
              <button id='refreshButton' onClick={pageRefresh}>Refresh</button>
              <h1 id='universe_side1'>F1 UNIVERSE</h1>
          </div>
        </>
        :
        <div id='title1'>
            <button className='openBtn' onClick={() => setShow(true)}>&#9776; Open</button>
            <button id='refreshButton' onClick={pageRefresh}>Refresh</button>
            <h1 id='universe1'>F1 UNIVERSE</h1>
        </div>
      }
      <br></br>
      <Row className='justify-content-center'>
        <Col className='col-sm-3 text-center'>
          <button id='constructors' className='justify-content-center' onClick={() => openConstructors()} style={{marginLeft: "20%", backgroundColor: "#fff0f0"}}>Constructors</button>
        </Col>
      </Row>
      <br></br>
        <Table id='table_standings' style={{ border: "1px solid black", backgroundColor: "#fff0f0", borderCollapse: "collapse", width: "50%", margin: "auto", fontSize: "20px"}}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Position</th>
              <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Driver</th>
              <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Number</th>
              <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Team</th>
              <th style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>Points</th>
            </tr>
          </thead>
          <tbody>
              {results.MRData?.StandingsTable?.StandingsLists[0].DriverStandings.map(element => {
                return (
                  <tr>
                    <td key={element.Driver.driverId} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                      {element.position}
                    </td>
                    <td key={element.Driver.dateOfBirth} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                      {element.Driver.givenName}
                      {" "}
                      {element.Driver.familyName}
                    </td>
                    <td key={element.Driver.permanentNumber} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                      {element.Driver.permanentNumber}
                    </td>
                    <td key={element.positionText} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                      {element.Constructors[0].name}
                    </td>
                    <td key={element.Driver.code} style={{ border: "1px solid black", borderCollapse: "collapse", marginLeft: "auto", marginRight: "auto", fontSize: "20px", padding: "10px"}}>
                      {element.points}
                    </td>
                  </tr>
                )
              }  )}
          </tbody>
        </Table>
        <br></br>
        <br></br>
    </div>
  )
}

export default Standings;

