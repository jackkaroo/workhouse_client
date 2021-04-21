import React, {useEffect, useState} from "react"
import {Button} from "semantic-ui-react"
import Input from "../Input/Input"

export default function House( {house}) {

  const [user, setUser] = useState([]);
  const [date, setDate] = useState([]);

  const fetchData = async () => {
    console.log('http://localhost:3000/users/' + house.user_id);
    fetch('http://localhost:3000/users/' + house.user_id, {

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
      setUser(data);
    });
  };

  useEffect(()=>{
    fetchData()
  }, [])

  const applyToHouse = async () => {
    const obj = {
      work_start_time : date
    }
    console.log(obj);

    fetch('http://localhost:3000/houses/' + house.id + '/tenants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(obj)
    })
    .then((response) => {
      alert(response.status)
      return response.json();
    })
    .then((data) => {
      if(data.error) {
        alert(data.error)
      }
    });
  };

  return (
    <div className={'owner-house'}>
      <div>House Id: {house.id}</div>
      <div>City id: {house.city_id}</div>
      <div>House Name: {house.house_name}</div>
      <div>Owner id: {house.user_id}</div>
      <div>Owner Name {user.name}</div>
      <div>Description: {house.description}</div>
      <div>Total Work Places: {house.total_work_places}</div>
      <div>Current Work Places: {house.current_work_places}</div>
      <div>Work Place Price: {house.work_place_price}</div>

      {
        (localStorage.getItem("role") == 0) ?
          <div className={'mt-5'}>
            <label>Enter date of start work</label>
            <Input type={"date"} setQueryParam={setDate}></Input>
            <div className={'mt-3'}><Button primary onClick={applyToHouse}>Apply</Button></div>
          </div>

          : null
      }
    </div>
  );
}

