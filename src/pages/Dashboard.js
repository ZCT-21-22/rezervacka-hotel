import ReservationCard from '../components/ReservationCard'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import CategoriesContext from '../context'


const Dashboard = () => {

    const [reservations, setReservations] = useState(null)
    const { categories, setCategories } = useContext(CategoriesContext)

    useEffect(async () => {
        const response = await axios.get('http://localhost:8000/reservations')

        const dataObject = response.data.data
        const arrayOfKeys = Object.keys(dataObject)
        const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])

        const formattedArray = []
        arrayOfKeys.forEach((key, index) => {
            const formattedData = { ...arrayOfData[index] }
            formattedData['documentId'] = key
            formattedArray.push(formattedData)

        })

        setReservations(formattedArray)

    }, [])

    useEffect(() => {
        setCategories([...new Set(reservations?.map(({ category }) => category))])
    }, [reservations])

    const colors = [
        'rgb(255,179,186)',
        'rgb(255,223,186)',
        'rgb(255,255,186)',
        'rgb(186,255,201)',
        'rgb(186,255,255)'
    ]

    const uniqueCategoria = [
        ...new Set(reservations?.map(({ category }) => category))
    ]


    return (
        <div className="dashboard">
            <h1>Rezervacie</h1>
            <div>Informacie o ubytovani treba vopred napisat do popisu 
                1 hvizdicka : cena 25 eur noc
                2 hvizdicka : cena 50 eur noc
                3 hvizdicka : cena 75 eur noc
                4 hvizdicka : cena 100 eur noc
                5 hvizdicka : cena 125 eur noc
            </div>
            <div className="reservation-container">
                {reservations && uniqueCategoria?.map((uniqueCategoria, categoryIndex) => (
                    <div key={categoryIndex}>
                        <h3>{uniqueCategoria}</h3>
                        {reservations.filter((reservation) => reservation.category === uniqueCategoria)
                            .map((filteredReservation, _index) => (
                                <ReservationCard
                                    id={_index}
                                    color={colors[categoryIndex] || colors[0]}
                                    reservation={filteredReservation}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard