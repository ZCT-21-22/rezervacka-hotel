import blankPhoto from '../images/blank-avatar.png'


const PhotoDisplay =({reservation}) =>{
    return (
        <div className="photo-container">
            <div className="img-container">
                <img src={reservation.photo ? reservation.photo: blankPhoto} alt={'fotka '+reservation.owner}/>
            </div>
        </div>
    )
}

export default PhotoDisplay