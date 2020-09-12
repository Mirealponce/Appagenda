import React, { Component } from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';


export default class NotesList extends Component {
    state ={
        listNotes: [],
    }
    componentDidMount() {
        this.getListNotes();
    }

    getListNotes = async() => {
     const notes= await axios.get('http://localhost:4000/api/notes/');
     this.setState({listNotes: notes.data })
     console.log(this.state.listNotes);
    }

    onClickDelete=async(id)=>{
        await axios.delete('http://localhost:4000/api/notes/'+id);
        this.getListNotes();

    }

    render() {
        return (
            <div className="row">
            {
                this.state.listNotes.map(note=> (
                    <div key={note._id} className="col-md-4 p-2">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>{note.title}</h5>
                               
                                <Link className="btn btn-info" to={"/edit/"+note._id}>
                                    Editar
                                </Link>
                            </div>
                            <div className="card-body">
                                <p >{note.description}</p>
                                <p >{note.author}</p>
                                <p >{format(note.date)}</p>
                            </div>

                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={()=>this.onClickDelete(note._id)}>
                                    Delete
                                </button>
                                
                            </div>
                        </div>
                    </div>


                ))
            }
            </div>
        )
    }
}
