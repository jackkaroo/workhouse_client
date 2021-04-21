import React, {useEffect, useState} from "react"
import EditCategoryModal from "../Categories/EditCategory"
import {Button} from "semantic-ui-react"

export default function Tenant( {tenant, fetchData, path}) {
  const [house, setHouse] = useState("");

  const fetchHouseData = async () => {
    fetch('http://localhost:3000/houses/' + tenant.house_id, {
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
      setHouse(data);
    });
  };

  useEffect(()=>{
    fetchHouseData()
  }, [])

  return (
    <tr>
      <td>{tenant.id}</td>
      <td>{tenant.house_id}</td>
      <td>{house.house_name}</td>
      <td>{tenant.work_start_time}</td>
      <td>{handleStatus(tenant.status)}</td>
    </tr>
  );
}

function handleStatus(status) {
  if(status == 0) return 'pending';
  if(status == 1) return 'accepted';
  if(status == 2) return 'rejected';
}

