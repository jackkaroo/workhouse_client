import EditEmployeeModal from "../Employees/EditNewEmployee"
import EditCategoryModal from "./EditCategory"
import {useState} from "react"

export default function Category( {category, index, fetchData}) {

  const [showModal, setShowModal] = useState(false);

  const deleteCategory = () => {
    fetch('http://localhost:3001/api/categories/' + category.category_number, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(res => {
      if(res.status === 200) fetchData()
      else {
        alert('You can not delete category because of database integrity. ' +
          'Delete products before.')
      }
    })
  }


  return (
    <tr>
      <td>{index + 1}</td>
      <td>{category.category_number}</td>
      <td>{category.category_name}</td>
      {
        localStorage.getItem("role") === "manager"
        &&
        <td>
          <img className="icon" alt="" src="https://imgur.com/gsqALsZ.png" onClick={() => setShowModal(true)}/>
          <img className="icon" alt="" src="https://imgur.com/ypHqYP0.png" onClick={deleteCategory}/>
          <EditCategoryModal category={category} fetchData={fetchData}
                             show={showModal} handleClose={() => setShowModal(false)}/>
        </td>
      }
    </tr>
  );
}

