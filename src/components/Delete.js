import axios from "axios"

const Delete =({documentId}) =>{
    
    const deleteReservation = async () =>{
        const response = await axios.delete(`http://localhost:8000/reservations/${documentId}`)
        const success = response.status == 200
        if(success) window.location.reload()

    }
    
    return (
        <div className="delete-block">
            <div className="delete-icon" onClick={deleteReservation}>✖</div>

        </div>
    )
}

export default Delete