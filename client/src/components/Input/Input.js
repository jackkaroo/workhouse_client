
export default function Input ( {setQueryParam, placeholder, type, label} ) {
  return(
    <div className="mr-30 d-flex flex-column">
      {
        label && <label>{label}</label>
      }
      <input type={type ? type : 'text'}
             placeholder={placeholder ? placeholder : ''}
             onChange={e => setQueryParam(e.target.value)}/>
    </div>
  )
}