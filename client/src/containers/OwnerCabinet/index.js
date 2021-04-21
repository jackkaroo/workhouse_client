import Header from "../../components/Header";
import React, {useEffect, useState} from "react"
import Tenant from "../../components/Tenant"
import OwnerHouse from "../../components/OwnerHouse"
import {Button, Dropdown} from "semantic-ui-react"
import ButtonShow from "../../components/Button/ButtonShow"
import ButtonReload from "../../components/Button/ButtonReload"
import Input from "../../components/Input/Input"
import NewCategoryModal from "../../components/Categories/AddNewCategory"
import AddNewHouse from "../../components/OwnerHouse/AddNewHouse"

export default function OwnerCabinet() {
  const [clickedCheck, setClickedCheck] = useState(false);

  const [houses, setOwnersHouses] = useState([]);
  const [houseParam, setHouseParam] = useState(1);
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchHouses = async () => {
    fetch('http://localhost:3000/houses?user_id=' + localStorage.getItem('id'), {
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
      setOwnersHouses(data);
    });
  };


  useEffect(()=>{
    fetchHouses();
  }, [])

  const getHouse = (event, {value}) => {
    setHouseParam(value);
  }

  const acceptTenant = (id, house_id) => {
    const obj = {
      status:1
    }

    fetch('http://localhost:3000/houses/' + house_id + '/tenants/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(obj)
    })
    .then(res => {
      alert(res.status)
    })
  }

  const rejectTenant = (id, house_id) => {
    const obj = {
      status:2
    }

    fetch('http://localhost:3000/houses/' + house_id + '/tenants/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(obj)
    })
    .then(res => {
      alert(res.status)
    })
  }

  return (
    <div className={'container'}>
      <Header/>
      <div className="header">
        <h1>My houses</h1>
        <Button primary className={'ms-4'} onClick={() => setShowModal(true)}>
          Add new
        </Button>
        <AddNewHouse show={showModal} handleClose={() => setShowModal(false)}/>
      </div>

      <div className={'d-flex owner-house-wrapper'}>
        {console.log(houses)}
        {houses.map((house, index) =>
          <OwnerHouse house={house} key={index}/>
        )}
      </div>

      <div className={'header show-tenants-title'}>
        <h1>Show tenants by house id</h1>
        <div className={'input-dropdown'}>
          <Dropdown
                    placeholder='Select House'
                    fluid
                    search
                    selection
                    options={handleArr(houses)}
                    onChange={getHouse}
          />
        </div>
        <ButtonReload setItems={setTenants}
                      path={'http://localhost:3000/houses/' + houseParam +'/tenants'}/>
        <ButtonShow setItems={setTenants} setClickedCheck={setClickedCheck}
                    path={'http://localhost:3000/houses/' + houseParam +'/tenants'}/>

      </div>
      <div className={(clickedCheck)? 'header-show' : 'header-hide'}>
        <table className="table table-hover table-bordered">
          <thead>
          <tr>
            <th scope="col">Tenant id</th>
            <th scope="col">User id</th>
            <th scope="col">House id</th>
            <th scope="col">Work start time</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          {tenants.map((ten,index) =>
            <tr key={index}>
              <td>{ten.id}</td>
              <td>{ten.user_id}</td>
              <td>{ten.house_id}</td>
              <td>{ten.work_start_time}</td>
              <td>{handleStatus(ten.status)}</td>
              {
                (ten.status==0) ?
                  <td>
                    <Button primary onClick={() => {acceptTenant(ten.id,ten.house_id)}}>Accept</Button>
                    <Button secondary onClick={() => {rejectTenant(ten.id,ten.house_id)}}>Reject</Button>
                  </td>
                  : <td></td>
              }
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function handleArr(data) {
  const dataNew = data.map(el => {
    return {key: el.id, text: el.id, value: el.id}
  })
  return dataNew;
}

function handleStatus(status) {
  if(status == 0) return 'pending';
  if(status == 1) return 'accepted';
  if(status == 2) return 'rejected';
}

