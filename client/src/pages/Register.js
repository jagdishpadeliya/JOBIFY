import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { FormRow, Logo } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage'
import Alert from "../components/Alert";
import { useAppContext } from "../context/appContext";
const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:false,
}

const Register = ()=>{
    const navigate = useNavigate();
    const [values,setValues] = useState(initialState);
    const {isLoading, showAlert,displayAlert,user,setupUser} = useAppContext();


    const handleChange = (e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password,isMember} = values
        if(!email||!password||(!isMember&&!name)){
            displayAlert()
            return
        }
        const currentUser = {name,email,password}
        if(isMember){
            setupUser({
                currentUser,
                endpoint:'login',
                alertText:'Login Successfull! Redirecting...'
            });
        }else{
            setupUser({
                currentUser,
                endpoint:'register',
                alertText:'User Created! Redirecting...'
            });
        }
    }

    const toggleMember = ()=>{
        setValues({...values,isMember:!values.isMember})
    }
    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate('/')
            },3000)
        }
    },[user,navigate])
    return(
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember?'Login':'Register'}</h3>
                {showAlert&&<Alert/>}
                {/* name field */}
                {!values.isMember&&(
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handlechange={handleChange}
                    />
                )}
                <FormRow
                    type='email'
                    name='email'
                    value={values.email}
                    handlechange={handleChange}
                />
                <FormRow
                    type='password'
                    name='password'
                    value={values.password}
                    handlechange={handleChange}
                />
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember?'Not a member yet?':'Already a member?'}
                    <button type="button" onClick={toggleMember}
                        className='member-btn'>
                            {values.isMember?'Register':'Login'}
                        </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register;