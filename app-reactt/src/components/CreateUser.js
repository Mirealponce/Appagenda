import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {

    state = {
        listUsers: [],
        username:''
    } 

    async componentDidMount() {
      
            this.getListUsers();
      
    }

    async getListUsers(){
        const res = await axios.get("http://localhost:4000/api/users/");

        this.setState({ listUsers: res.data });
    }




    onChangeUsername=(e)=>{
        this.setState({username:e.target.value});
        
    }
    
    enviarInfo = async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users/',{
            username: this.state.username
        });

        this.setState({username:''});
        this.getListUsers();
    }

    deleteUser=async(ide)=>{
        await axios.delete('http://localhost:4000/api/users/'+ide);
        this.getListUsers();
        console.log(ide);
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                   <div className="card card-body">
                       <h3>Registrar </h3>
                       <form onSubmit={this.enviarInfo}>
                           <div  className="form-group">
                               <input
                                value={this.state.username}
                                className="form-control"
                                type="text"
                               onChange={this.onChangeUsername}
                               >

                               </input>
                           </div>
                           <button type="submit" className="btn btn-primary">
                               Guardar
                           </button>
                       </form>
                   </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.listUsers.map(user => (
                                <li  key={user._id} className="list-group-item list-group-item-action"
                                onDoubleClick={()=>this.deleteUser(user._id)}
                                >
                                   
                                    {user.username}
                               
                                </li>)
                            )
                        }
                    </ul>

                </div>



            </div>
        )
    }
}
