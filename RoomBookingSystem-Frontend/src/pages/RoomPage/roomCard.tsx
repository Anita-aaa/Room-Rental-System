
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

const RoomCard = ({ roomData }) => {

    const [user, setUser] = useState({

    })
    useEffect(() => {
        const data: any = JSON.parse(localStorage.getItem("userDetails"));
        setUser(data);
    }, [localStorage.getItem("userDetails")]);
    console.log(user?.id)


    const useApiCall = useMutation({
        mutationKey: ["POST_CART_DATA"],
        mutationFn: (payload) => {
            // Update the endpoint and headers according to your backend requirements
            return axios.post("http://localhost:8080/cart/save", payload);
        },onSuccess:()=>{
            alert("Item added to cart successfully")
        }
    });

    const onSubmit = (itemId, total_price) => {
        // Create the payload with itemId, userId, itemPrice, and quantity
        const payload = {
            itemId,
            userId: user.id,
            total_price,
            quantity: 1, // Initial quantity
        };
        console.log(payload)
        // Call the mutation function with the payload

        useApiCall.mutate(payload);
    };

    const showLoginPopup = () => {
        alert("Please log-in to book items");
    };


    return (
        <>
            <section className="room-card--cointainer">
                {roomData && roomData.length > 0 ? (
                    roomData.map((curElem: any) => (
                        <div className="room-card-container" key={curElem?.id}>
                            <div className="room-card">
                                <div className="room-card-body">
                                    <span className="room-card-author subtle">{curElem?.category?.name}</span>
                                    <img src={'data:image/jpeg;base64,'+curElem?.roomImage} alt={curElem?.roomName} className="room-card-media" />
                                    <h2 className="room-card-title">{curElem?.roomName}</h2>
                                    <div className={"price-addtocart-div"}>
                                        <h4 className="room-card-price subtle">Rs. {curElem?.roomPrice}</h4>
                                        <span>
                                            <button className="add-to-card-btn subtle"
                                                    onClick={() => user ? onSubmit(curElem.id, curElem.roomPrice) : showLoginPopup()}> Book
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No room items available</div>
                )}
            </section>
        </>
    );
};

export default RoomCard;
