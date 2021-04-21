import Header from "../../components/Header";
import React, {useEffect, useState} from "react"
import House from "../../components/House"
import {Button, Dropdown} from "semantic-ui-react"

export default function Home() {

  const [houses, setHouses] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityParam, setCityParam] = useState("");

  const fetchCityData = async () => {
    fetch('http://localhost:3000/cities', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCities(handleData(data));
    });

  };

  const fetchHousesData = async () => {
    fetch('http://localhost:3000/houses', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setHouses(data);
    });
  };

  useEffect(()=>{
    fetchCityData();
    fetchHousesData();
  }, [])

  const getCity = (event, {value}) => {
    setCityParam(value);
  }

  const fetchHousesByCity = async() => {
      fetch('http://localhost:3000/houses?city_id=' + cityParam, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('houses before', houses);
        setHouses(data);
      });
  }

  return (
    <div className={'container'}>
      <Header/>
      <div className="header">
        <h1 className={'house-title'}>Search Houses</h1>
        <Button onClick={fetchHousesData}>Show All</Button>

        <div className={'input-dropdown'}>
          <Dropdown
                    placeholder='Select City'
                    fluid
                    search
                    selection
                    options={cities}
                    onChange={getCity}
          />
        </div>

        <Button onClick={fetchHousesByCity}>Search By City</Button>
      </div>

      <div className={'d-flex owner-house-wrapper'}>
        {houses.map((house,index) =>
          <House key={index} house={house} index={index}/>)}
      </div>
    </div>
  );
}

function handleData(data) {
  const dataNew = data.map(el => {
    return {key: el.id, text: el.city_name, value: el.id}
  })
  return dataNew;
}

