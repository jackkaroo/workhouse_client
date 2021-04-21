import '../../styles/Modal.css'
import Input from "../Input/Input"
import {useState} from "react"

export default function AddNewHouse ({ handleClose, show}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [total_work_places, setTotal_work_places] = useState('');
  const [work_place_price, setWork_place_price] = useState('');

  const saveChanges = () => {
    const obj = {
      "city_id": city,
      "user_id": localStorage.getItem('id'),
      "house_name": name,
      "description": description,
      "current_work_places": 0,
      "total_work_places": total_work_places,
      "work_place_price": work_place_price
    }
    console.log(obj);

    fetch('http://localhost:3000/houses', {
      method: 'POST',
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
    <div className={showHideClassName}>
      <section className='modal-main'>
        <h2 className="mb-30">Add new House</h2>
        <div className='d-flex justify-content-center '>
          <div>
            <Input setQueryParam={setName} label={'Enter Name'}/>
            <Input setQueryParam={setDescription} label={'Enter Description'}/>
            <Input setQueryParam={setCity} label={'Enter City id'}/>
            <Input setQueryParam={setTotal_work_places} label={'Enter Total work places'}/>
            <Input setQueryParam={setWork_place_price} label={'Enter Work place price'}/>
            <div className="">
              <button className="btn btn-success" onClick={saveChanges}>Save</button>
              <button className="btn btn-danger" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
