import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

import {login} from '../../actions/auth';


function Login(props){
    const [values, setValues] = useState({username:'', password:''});
    // const {auth, login} = props;

    function onChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }

    function handleSubmit(){
        if(values.username !== '' && values.password !== ''){
            login(values);
        } else {
            alert('Values must not be empty')
        }
    }

    return (
        <div>
            <form className='' onSubmit={handleSubmit} data-test="form">
                <div className=''>
                    <label className='form-label' for='username'>Username</label>
                    <input className='form-control'
                        name='username'
                        value={values.username}
                        onChange={onChange}
                        />
                </div>
                <div className=''>
                    <label className='form-label' for='passowrd'>Passowrd</label>
                    <input className='form-control'
                        name='password'
                        value={values.password}
                        onChange={onChange}
                        />
                </div>
                <button
                    className='btn'>
                        Login
                </button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {auth: state.authReducer}
// }

// export default connect(mapStateToProps, {login})(Login);
export default Login;