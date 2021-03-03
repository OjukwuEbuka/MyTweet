import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';



function PrivateRoute({component: Component, auth, ...rest}){
    return (
        <Route 
            {...rest}
            render = {
                props => {
                    if(auth.isLoading){
                        return (
                            <h2>...Loading</h2>
                        )
                    } else if(!auth.isAuthenticated){
                        return <Redirect to='/login' />
                    } else {
                        return <Component {...props} />
                    }
                }
            }

        />
    )
}

const mapStateToProps = state => {
    return {auth: state.authReducer}
}

export default connect(mapStateToProps, {})(PrivateRoute);