import React, { Component } from 'react'
import './login.css';
import {connect} from 'react-redux';
import {loginUserFunction} from '../../action/Auth/actionSingup';
export class login extends Component {
    state={
        emailValidate:true,
        email:"",
        password:""
    }
   
    onKeyUpHandler=(e)=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
        {
           this.setState({
               emailValidate:true
           })
            
        }else{
            this.setState({
                emailValidate:false
            })
        }
        
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const userLoginDetails={
            email:this.state.email,
            password:this.state.password
        }
        this.props.onLogin(userLoginDetails);
    }
    render() { 
        if(this.props.authState.isAuthenticated)
        {
            this.props.history.push('/');
        }
        return (
            <div className="parentModel">
                <div className="parent-mob-wrapper">
                <nav>
                    <a href="/signup">Signup <span>&#8594;</span></a>
                </nav>
                <div className="loginModel" style={{margin:"0px"}}>
                   
                    <h1>Here you can login</h1>
                    <p style={{color:"#5D5F5C"}}>Lets's join us :)</p>
                    <form className="loginform"> 
                        
                        <label name="Email">Email</label>
                        <br></br>
                        <input type="email" name="email" onBlur={this.onKeyUpHandler} onChange={this.changeHandler}></input>
                       {this.state.emailValidate?null:<div><label  id="errorMessage">Mail address seems incorrect</label></div>} 
                        <label name="Password" >Password</label>
                        <br></br>
                        <input type="password"  name="password"onChange={this.changeHandler}></input>
                        <br></br><br></br>
                        <button className="loginbutton" onClick={this.handleSubmit}><p>Login</p></button>
                        <br></br>
                        <small ><a href="#" style={{color:"#FFAF5F",opacity:"0.7"}}>Forgotten Password</a></small>
                        <small style={{float:"right"}}><a href="/" style={{color:" #FFAF5F",opacity:"0.7"}}>Home</a></small>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    authState:state.auth
    });
const mapDispatchToProps=dispatch=>{
    return{
        onLogin:(userLoginDetails)=>dispatch(loginUserFunction(userLoginDetails))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(login)