import '../../styles/Modal.css'
import Input from "../Input/Input"
import {useState} from "react"

export default function NewCategoryModal ({ handleClose, show, fetchData}) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const [name, setName] = useState('');


  const saveChanges = () => {
    const obj = {
      category_name: name,
    }
    console.log(obj);

    fetch('http://localhost:3001/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(obj)
    })
    .then(res => {
      if(res.status === 200) {
        alert('You successfully added new category.')
        fetchData();
        handleClose();
      }
      else {
        alert('You entered invalid information. Try again.')
      }
    })
  }

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <h2 className="mb-30">Add new Category</h2>
        <div className='d-flex justify-content-center '>
          <div>
            <Input setQueryParam={setName} label={'Enter Category Name'}/>
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
