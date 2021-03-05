import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {login} from '../../actions/auth';


function Login(props){
    const [values, setValues] = useState({username:'', password:''});
    const {login} = props;

    function onChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        if(values.username !== '' && values.password !== ''){
            console.log(values);
            login(values);
        } else {
            alert('Values must not be empty')
        }
    }

    return (
        <div>
            <form className='' onSubmit={handleSubmit} data-test="form">
                <div className=''>
                    <label className='form-label'>Username</label>
                    <input className='form-control'
                        type='text'
                        name='username'
                        value={values.username}
                        onChange={onChange}
                        />
                </div>
                <div className=''>
                    <label className='form-label'>Password</label>
                    <input className='form-control'
                        type='password'
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

export default connect(null, {login})(Login);
// export default Login;