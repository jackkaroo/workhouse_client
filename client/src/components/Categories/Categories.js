import {useEffect, useState} from "react"
import Category from "./Category"
import CategoryHeader from "./CategoryHeader"
import Header from "../Header"
import NewCategoryModal from "./AddNewCategory"
const exportCSVFile = require('../../helpers/csv');

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    fetch('http://localhost:3001/api/categories', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.json();

    })
    .then((data) => {
      console.log(data);
      setCategories(data);
    });
  };

  useEffect(()=>{
    fetchData()
  }, [])

  const makeReport = () => {
    const fileTitle = 'employees'; // or 'my-unique-title'
    const itemsFormatted = [];
    const headers = {
      category_number: "id",
      category_name: "name",
    };

    categories.forEach((item) => {
      itemsFormatted.push({
        category_number: item.category_number,
        category_name: item.category_name,
      });
    });

    exportCSVFile(headers, itemsFormatted, fileTitle);
  }

  return (
    <div className="categories-wrapper">
      <Header/>
      <div className="header">
        <h2>Categories</h2>
        <button className="btn btn-secondary" onClick={makeReport}>Report</button>
        {
          localStorage.getItem("role") === "manager"
          && <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add new
          </button>
        }

        <NewCategoryModal fetchData={fetchData}
          show={showModal} handleClose={() => setShowModal(false)}/>
      </div>
      <table className="table table-hover table-bordered">
        <CategoryHeader/>
        <tbody>
        {categories.map((category,index) =>
          <Category fetchData={fetchData} key={index} category={category} index={index}/>)}
        </tbody>
      </table>
    </div>
  );
}
