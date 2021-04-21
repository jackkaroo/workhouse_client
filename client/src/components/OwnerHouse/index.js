import React, {useEffect, useState} from "react"

export default function OwnerHouse( {house}) {
  return (
    <div className={'owner-house'}>
      <div>House Id: {house.id}</div>
      <div>House Name: {house.house_name}</div>
      <div>Description: {house.description}</div>
      <div>City id: {house.city_id}</div>
      <div>Total Work Places: {house.total_work_places}</div>
      <div>Current Work Places: {house.current_work_places}</div>
      <div>Work Place Price: {house.work_place_price}</div>
    </div>
  );
}


