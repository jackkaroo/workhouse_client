import Header from "../../components/Header";
import React, {useEffect, useState} from "react"
import Tenant from "../../components/Tenant"

export default function WorkerCabinet() {

  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    fetch('http://localhost:3000/users/' + localStorage.getItem('id') + ' /tenants', {
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
      setTenants(data);
    });
  };

  useEffect(()=>{
    fetchTenants();
  }, [])

  return (
    <div className={'container'}>
      <Header/>
      <div className="header">
        <h1>My Tenants</h1>
      </div>

      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col">Tenant id</th>
          <th scope="col">House id</th>
          <th scope="col">House name</th>
          <th scope="col">Work start time</th>
          <th scope="col">Status</th>
        </tr>
        </thead>
        <tbody>
        {tenants.map((tenant,index) =>
          <Tenant key={index} tenant={tenant} fetchData={fetchTenants}/>)}
        </tbody>
      </table>
    </div>
  );
}


