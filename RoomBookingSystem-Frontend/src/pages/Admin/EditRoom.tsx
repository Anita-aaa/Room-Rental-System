import AdminSidebar from "./AdminSidebar.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useMutation} from "@tanstack/react-query";


const EditRoom = ()=>{

    const navigate = useNavigate();

    const useApiCall = useMutation({
        mutationKey:["POST_ROOM_MANAGEROOM"],
        mutationFn:(payload:any)=>{
            // console.log(payload)
            return axios.post("http://localhost:8080/room/save",payload)
        },onSuccess: () => {
            // notify();
            reset();
            navigate("/ManageRoom");
        }
    })

    const onSubmit=(value:any)=>{
        console.log(value);
        const fd= new FormData();
        fd.append("productName",value?.roomName)
        fd.append("price",value?.roomPrice)
        fd.append("image",value?.roomImage)

        fd.append("categoryId",value?.categoryId)
        // fd.append("productImage",value?.productImage[0])
        useApiCall.mutate(fd)
    }

    //To update
    const{pk_id} = useParams();

    const{data:getRoomByIdApi}=useQuery({
        queryKey:["GET_BY_ID_CATEGORY_API"],
        queryFn(){
            return axios.get("http://localhost:8080/room/findById/"+pk_id)
        },enabled:!!pk_id
    })

    //hitting server on port 8080
    const{register,
        handleSubmit,
        formState
        ,reset}=useForm({values:getRoomByIdApi?.data});

    const{errors} = formState;

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    return(
        <>
            <AdminSidebar activePage={currentLocation} />
            <div className="add-room-modal">
                <div className="add-room-modal-content">
                    <h2>Edit Room</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={"select-category"}>
                            {/*<label>Category : {filteredRoomData?.category?.name}</label>*/}
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
                            <input type={"text"} placeholder={"Enter the Image"} {...register("roomImage",{required:"Image is required!!"})}/>
                            <h6 style={{paddingLeft:"3px"}}>{errors?.roomImage?.message}</h6>
                        </div>
                        {/*<div className={"room-image"}>*/}
                        {/*    <label>Image</label>*/}
                        {/*    <span>*/}
                        {/*            <input type={"file"} placeholder={"Add image here"} {...register("productImage",{required:"Room Image is required!!"})}/>*/}
                        {/*             <h6 style={{paddingLeft:"3px"}}>{errors?.productImage?.message}</h6>*/}
                        {/*        </span>*/}
                        {/*</div>*/}

                        <div className={"room-name-add-btn"}>
                            <button type={"submit"}>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditRoom;