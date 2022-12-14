const FormRow = ({type,name,value,handlechange,labelText})=>{
    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>
                {labelText||name}
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handlechange}
                className='form-input'
            />
        </div>
    )
}

export default FormRow;