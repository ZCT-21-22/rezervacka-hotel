const Status =({status}) =>{

    const getColor =() =>{
        let color
        switch (status) {
            case 'obsadena':
                color = 'rgb(152,0,0)'
                break;
            case 'rezervovana':
                color = 'rgb(181,191,0)'
                break;
            case 'volna' : 
                color = 'rgb(0,139,0)'
                break;
            default:
                color= 'rgb(167,167,167)'
            }
        return color
    }

    return (
        <div className="status-display" style={{backgroundColor: getColor(status)}}>{status}</div>
    )
}

export default Status