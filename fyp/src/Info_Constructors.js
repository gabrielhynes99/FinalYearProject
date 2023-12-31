import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import team_images from "./img/team_images";
import './Info_Constructors.css';
import logo from "./img/logo512.png";

function Info_Constructors() {
    let counter = -1;
    let number = 0
    let info = [];
    let x = [];
    const [show, setShow] = useState(false);
    const [teamSearch, setTeamSearch] = useState("");
    const [search, setSearch] = useState([]);
    const [answer, setAnswer] = useState([]);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    useEffect(() => {
        const fetchData = async () => {
          await fetch(`http://ergast.com/api/f1/2022/constructors.json`, requestOptions)
          .then(response => response.text())
          .then(response2 => JSON.parse(response2))
          .then(result => info = result)
          .catch(error => console.log('error', error));
        };
        fetchData();

        setTimeout (() => {
            for(number = 0; number < info.MRData?.ConstructorTable?.Constructors.length; number++) {
                var obj = {};
                obj.img = team_images[number];
                obj.name = info.MRData?.ConstructorTable?.Constructors[number].name;
                obj.nationality = info.MRData?.ConstructorTable?.Constructors[number].nationality;
                obj.constructorId = info.MRData?.ConstructorTable?.Constructors[number].constructorId;
                x.push(obj);
            }
            setAnswer(x);
        }, 1000)

    }, []);

    useEffect(() => {
        setSearch(answer?.filter((element) => element.name.toLowerCase().includes(teamSearch.toLowerCase())
        || element.nationality.toLowerCase().includes(teamSearch.toLowerCase())));
    }, [teamSearch])

    function openDrivers() {
        window.location = "/statistics/info_drivers"
    };

    function openTracks() {
        window.location = "/statistics/info_tracks"
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
                    <div className="sidenav" >
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
            <Row className='justify-content-center'>
                <Col className='col-sm-2 text-center'>
                    <button className='info_drivers' style={{backgroundColor: "#fff0f0"}} onClick={() => openDrivers()}>Drivers</button>
                </Col>
                <Col className='col-sm-2 text-center'>
                    <button className='info_tracks'  style={{backgroundColor: "#fff0f0"}}onClick={() => openTracks()}>Tracks</button>
                </Col>
                <Col className='col-sm-3 text-center'>
                    <input id='input' type="text" style={{backgroundColor: "#fff0f0"}} placeholder="Search..." onInput={(e) => setTeamSearch(e.target.value)}/>
                </Col>
            </Row>
            <br></br>
            <div>
                <Row>
                {teamSearch ?
                    search?.map(element => {
                        counter = counter + 1;
                        return (
                            <Col className='col-sm-3' style={{ marginBottom: "20px"}}>
                                <Card className='card' border='danger'>
                                    <Card.Img className='img' variant="top" src={element.img} style={{backgroundColor: "#fff7f7"}}/>
                                    <Card.Body style={{backgroundColor: "#fff0f0"}}>
                                        <Card.Title key={element.constructorId}>
                                            Team:{" "}
                                            {element.name}
                                        </Card.Title>
                                        <Card.Text>
                                            Nationality:{" "}
                                            {element.nationality}
                                            <br></br>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }  )
                    :
                    answer?.map(element => {
                        counter = counter + 1;
                        return (
                            <Col className='col-sm-3' style={{ marginBottom: "20px"}}>
                                <Card className='card' border='danger' style={{backgroundColor: "#fff0f0"}}>
                                    <Card.Img className='img' variant="top" src={element.img} style={{backgroundColor: "#fff7f7"}}/>
                                    <Card.Body style={{backgroundColor: "#fff0f0"}}>
                                        <Card.Title key={element.constructorId}>
                                            Team:{" "}
                                            {element.name}
                                        </Card.Title>
                                        <Card.Text>
                                            Nationality:{" "}
                                            {element.nationality}
                                            <br></br>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }  )
                }
                </Row>
            </div>
        </div>
    )

}

export default Info_Constructors;