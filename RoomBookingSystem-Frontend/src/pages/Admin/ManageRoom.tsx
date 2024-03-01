import "../../css/ManageRoom.css";
import React, { useEffect, useState } from "react";
import {FaPlus, FaRegWindowClose, FaSearch} from "react-icons/fa";
import gsap from "gsap";
import AdminSidebar from "./AdminSidebar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {useForm} from "react-hook-form";


const ManageRoom: React.FC = () => {

    const[search,setSearch] = useState('');
    const navigate = useNavigate();

    // Add Rooms modal
    const [modal, setModal] = useState(false);

    const toggleRoomModal = () => {
        if (modal) {
            reset(); // Reset the form
        }
        setModal(!modal); // Toggle the modal
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    // GSAP cdn for animation
    useEffect(() => {
        if (modal) {
            gsap.from(".add-room-modal", {
                y: -50,
                duration: 0.3,
                opacity: 0,
            });
        }
    }, [modal]);

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;


    //hitting server on port 8080
    const{register,
        handleSubmit,
        formState
        ,reset}=useForm();

    const{errors} = formState;

    const useApiCall = useMutation({
        mutationKey:["POST_Room_DATA"],
        mutationFn:(payload:any)=>{
            console.log(payload)
            return axios.post("http://localhost:8080/room/save",payload)
        },onSuccess: () => {
            // notify();
            reset();
            refetch();
        }
    })

    const onSubmit=(value:any)=>{
        console.log(value);
        const fd= new FormData();
        fd.append("roomName",value?.roomName)
        fd.append("roomPrice",value?.roomPrice)
        fd.append("categoryId",value?.categoryId)
        fd.append("roomImage",value?.roomImage[0])
        useApiCall.mutate(fd)
    }


    // Fetching data from API
    const{data,refetch} = useQuery({
        queryKey:["GET_Room_DATA"],
        queryFn(){
            return axios.get("http://localhost:8080/room/findAll")
        }
    })

    //Searching data
    const filteredRoomData = data?.data.filter((room) =>
        room.roomName.toLowerCase().includes(search.toLowerCase()) ||
        room.id.toString().includes(search.toLowerCase()) ||
        room.category?.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(filteredRoomData)

    const { data: categories } = useQuery({
        queryKey: ["GET_CATEGORIES"],
        queryFn() {
            return axios.get("http://localhost:8080/category/findAll"); // Replace with your actual API endpoint
        },
    });

    //Deleting data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_Room_BY_ID"],
            mutationFn(id:number){
                return axios.delete("http://localhost:8080/room/delete/"+id);
            },onSuccess(){refetch()}
        }
    )

    console.log(filteredRoomData)

    return(
        <div>
            <div className={"add-room-page"}>
                <div className={"roompage-left"} >
                    <AdminSidebar activePage={currentLocation} />
                </div>

                <div className={"roompage-right"}>
                    <header className={"roompage-header"}>
                        <h1>Manage Room</h1>

                        <div className={"search-wrapper"}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search Room"} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        </div>

                        <div className={"user-wrapper"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>

                    <div className={"room-main-content"}>
                        <div className={"i-main-content"}>
                            <div className={"btn3"}>
                                <button type={"button"} onClick={toggleRoomModal}><span><FaPlus style={{fontSize:"1.5rem",marginBottom:"-1px",color:"white"}}/></span></button>
                            </div>

                            <div className={"table-container3"}>
                                <div className={"card-header3"}>
                                    <h2>Rooms</h2>
                                </div>
                                <div className={"card-body3"}>
                                    <table className={"table-bordered3"}>
                                        <thead>
                                        <tr>
                                            <th className={"id-box3"}>Id</th>
                                            <th className={"name-box3"}>Name</th>
                                            <th className={"category-box3"}>Category</th>
                                            <th className={"image-box3"}>Image</th>
                                            <th className={"price-box3"}>Price</th>
                                            <th className={"action-box3"}>Action</th>
                                            {/*<th className={"status-box3"}>Status</th>*/}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredRoomData
                                                ?.sort((a, b) => a.id - b.id)
                                                .map((i) =>{
                                                    return(
                                                        <tr key={i?.id}>
                                                            <td>{i?.id}</td>
                                                            <td>{i?.roomName}</td>
                                                            <td>{i?.category?.name}</td>
                                                            <td style={{display:"flex",justifyContent:"center"}}>
                                                                <img src={'data:image/jpeg;base64,'+i?.roomImage} width={"45px"}/>
                                                            </td>
                                                            <td>{i?.roomPrice}</td>
                                                            <td>
                                                                <button className={"edit-btn3"} onClick={()=>{
                                                                    navigate("/editRoom/"+i?.id);
                                                                    // console.log(i?.id)
                                                                }}><CiEdit />
                                                                </button>
                                                                <button className={"delete-btn3"} onClick={() => {
                                                                    if (window.confirm("Are you sure you want to delete this category?")) {
                                                                        deleteByIdApi.mutate(i?.id);
                                                                    }
                                                                }}><MdDelete />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modal && (
                <div className="add-room-modal">
                    <div onClick={toggleRoomModal} className="add-room-overlay"></div>
                    <div className="add-room-modal-content">
                        <h2>Add Room</h2>
                        <button className="close-add-room-btn" onClick={toggleRoomModal}>
                            <FaRegWindowClose />
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={"select-category"}>
                                <label>Category</label>
                                <select id={"category-option"} placeholder={""} {...register("categoryId", { required: true })}>
                                    <option>Select a Category</option>
                                    {categories &&
                                        categories.data.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className={"room-name"}>
                                <label>Room Name</label>
                                <input type={"text"} placeholder={"Enter room Name"} {...register("roomName",{required:"Room Name is required!!"})}/>
                                <h6 style={{paddingLeft:"3px"}}>{errors?.roomName?.message}</h6>
                            </div>
                            <div className={"room-price"}>
                                <label>Price</label>
                                <input type={"number"} placeholder={"Enter the Price"} {...register("roomPrice",{required:"Price is required!!"})}/>
                                <h6 style={{paddingLeft:"3px"}}>{errors?.roomPrice?.message}</h6>
                            </div>
                            <div className={"room-image"}>
                                <label>Image</label>
                                <span>
                                    <input type={"file"} placeholder={"Add image here"} {...register("roomImage",{required:"Room Image is required!!"})}/>
                                     <h6 style={{paddingLeft:"3px"}}>{errors?.roomImage?.message}</h6>
                                </span>
                            </div>

                            <div className={"room-name-add-btn"}>
                                <button type={"submit"}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRoom