import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        listusers: [],
        userSelected: '',
        title: '',
        description: '',
        Date: new Date(),
        editar:false,
        idNote:''
    }

    componentDidMount() {
        this.getListUsers();
        if(this.props.match.params.id){
            this.getDetailsUser();
            this.setState({
                editar:true,
                idNote:this.props.match.params.id
            });
           
        }
    }

    getDetailsUser=async()=>{
       const nota= await axios.get('http://localhost:4000/api/notes/'+this.props.match.params.id)
       
       this.setState({
           title:nota.data.title,
           description:nota.data.description,
           userSelected: nota.data.author
         
       })

    }


    getListUsers = async () => {
        const users = await axios.get('http://localhost:4000/api/users/');

        this.setState({ 
            listusers: users.data.map(user => user.username),

            userSelected:users.data[0].username

        
        });

        


    }



    enviarInfo = async(e) => {
        e.preventDefault();
        if(this.state.editar){
            await axios.put('http://localhost:4000/api/notes/'+this.state.idNote,{
                title:this.state.title,
                description:this.state.description,
               
                author:this.state.userSelected
            });

        }else{
            await axios.post('http://localhost:4000/api/notes/',{
                title:this.state.title,
                description:this.state.description,
                date:this.state.Date,
                author:this.state.userSelected
            });
        }
       
        window.location.href='/';

    }

    onChangeUser = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeDate = (date) => {
        this.setState({ Date: date });

    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear una tarea</h4>
                    <div className="form-group">
                        <select className="form-control"
                            name="userSelected"
                            onChange={this.onChangeUser}
                            value={this.state.userSelected}
                        >

                            {
                                this.state.listusers.map(user =>

                                    <option key={user}>{user}</option>

                                )
                            }

                        </select>
                    </div>


                    <form onSubmit={this.enviarInfo}>
                        <div className="form-group">

                            <input type="text"
                                className="form-control"
                                placeholder="Título"
                                name="title"
                                required
                                onChange={this.onChangeUser}
                                value={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <textarea type="text"
                                className="form-control"
                                placeholder="Descripción"
                                name="description"
                                onChange={this.onChangeUser}
                                value={this.state.description}

                            ></textarea>


                        </div>

                        <div className="form-group">
                            <DatePicker
                                className="form-control"
                                selected={this.state.Date}
                                onChange={this.onChangeDate}

                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                    </button>
                    </form>
                </div>
            </div>
        )
    }
}
