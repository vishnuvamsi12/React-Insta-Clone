import React, {useContext, useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../../images/circle_icon.svg";
import Camera from "../../../images/camera_icon.png";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import "./NewPost.css";
import Header from "../Header/Header";
import { addNewPost } from "../../../services/http-services";
import { useNavigate } from "react-router-dom";
import { PostList } from "../../contexts/PostContext";

export default function NewPost(){

    const listNavigation = useNavigate();
    const {addPost} = useContext(PostList);

    const [formData, setFormData] = useState({
        image:null,
        name:"",
        location:"",
        description:""
    })

    function CaptureForm(event){
        event.preventDefault();
        const formValues = new FormData(event.target);
        formValues.append("date", new Date().toDateString());
        formValues.append("likes", 0);
        formValues.append("id", ("" + new Date().getTime()));

        addNewPost(formValues).then(res =>{
            if(res.status === "Success"){
            addPost(res.result);
            setFormData({
                image:null,
                name:"",
                location:"",
                description:""
            });
            listNavigation("../post/all");
        }
        }).catch(err =>{
            console.log("FAILED TO POST DATA:- ");
        })
    }

    return (
        
    <>
        <Header />
            
        <div className="new-post-container">
            <Card>
                <Card.Body>
                    <Form onSubmit={CaptureForm}>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control name="image" type="file" required accept="image/*" onChange={(e)=>{
                                    setFormData(previous=>{
                                        return {
                                            ...previous,
                                            image: e.target.files[0]
                                        }
                                    })
                                }}
                            />
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <Form.Control aria-label="Author" name="name" placeholder="Enter Name" required value={formData.name} onChange={(e)=>{
                                    setFormData(previous=>{
                                        return {
                                            ...previous,
                                            name: e.target.value
                                        }
                                    })
                                }}/>
                            <Form.Control aria-label="Location" name="location" placeholder="Enter Location" required value={formData.location} onChange={(e)=>{
                                    setFormData(previous=>{
                                        return {
                                            ...previous,
                                            location: e.target.value
                                        }
                                    })
                                }}  />
                        </InputGroup>

                        <Form.Control size="lg" type="text" name="description" placeholder="Description" required value={formData.description} onChange={(e)=>{
                                    setFormData(previous=>{
                                        return {
                                            ...previous,
                                            description: e.target.value
                                        }
                                    })
                                }} />

                        <div className="btn-container">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    </>
    )
}