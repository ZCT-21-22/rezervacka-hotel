import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import CategoriesContext from "../context"

const ReservationPage = ({ editMode }) => {
    const {categories, setCategories} = useContext(CategoriesContext)
    const navigate = useNavigate()
    let { id } = useParams()


    const [formData, setFormData] = useState({
        status: 'rezervovana',
        progress: 0,
        category: categories[0],
        timestamp: new Date().toISOString()
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (editMode) {
            const response = await axios.put(`http://localhost:8000/reservations/${id}`, {
                data: formData
            })
            const success = response.status === 200
            if (success) {
                navigate('/')
            }
        }

        if (!editMode) {
            console.log("spracuvam")
            const response = await axios.post('http://localhost:8000/reservations', {
                formData
            })
            const success = response.status === 200
            if (success) {
                navigate('/')
            }
        }

    }

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/reservations/${id}`)
        console.log("FETCHING",response)
        setFormData(response.data.data)
    }

    useEffect(() => {
        if (editMode) fetchData()
    }, [])




    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        })
        )
    }

    return (
        <div className="reservation">
            <h1>{editMode ? 'Zmenit Rezervaciu' : 'Vytvorit Rezerváciu'}</h1>
            <div className="reservation-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="title">Nazov izby/čislo</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.title}
                        />

                        <label htmlFor="description">popis vášho pobytu</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.description}
                        />

                        <label>Kategoria izby</label>
                        <select
                            name="category"
                            value={formData.category || 'New Category'}
                            onChange={handleChange}
                        >

                            {categories?.map((category, _index) => (
                                <option key={_index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="new-category">Nová Kategoria</label>
                        <input
                            id="new-category"
                            name="category"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.category}
                        />

                        <div className="multiple-input-container">
                            <label>Počet hviezdičiek </label>
                            <label htmlFor="priority-1"> 1</label>
                            <input
                                id="priority-1"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={1}
                                checked={formData.priority == 1}
                            />

                            <label htmlFor="priority-2">2</label>
                            <input
                                id="priority-2"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={2}
                                checked={formData.priority == 2}
                            />

                            <label htmlFor="priority-3">3</label>
                            <input
                                id="priority-3"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={3}
                                checked={formData.priority == 3}
                            />

                            <label htmlFor="priority-4">4</label>
                            <input
                                id="priority-4"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={4}
                                checked={formData.priority == 4}
                            />

                            <label htmlFor="priority-5">5</label>
                            <input
                                id="priority-5"
                                name="priority"
                                type="radio"
                                onChange={handleChange}
                                value={5}
                                checked={formData.priority == 5}
                            />

                        </div>
                        {editMode &&
                            <>
                                <input
                                    type="range"
                                    id="progress"
                                    name="progress"
                                    value={formData.progress}
                                    min="0"
                                    max="100"
                                    onChange={handleChange}
                                />
                                <label htmlFor="progress">Dlžka pobytu</label>


                                <label> Status </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option selected={formData.status === 'obsadena'} value='obsadena'>Obsadena</option>
                                    <option selected={formData.status === 'volna'} value='volna'>Volna</option>
                                    <option selected={formData.status === 'rezervovana'} value='rezervovana'>Rezervovana</option>
                                </select>
                            </>
                        }

                        <input type="submit" />
                    </section>

                    <section>
                        <label htmlFor="owner"> Owner </label>
                        <input
                            id="owner"
                            name="owner"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={formData.owner}
                        />
                        <label htmlFor="photo"> Photo </label>
                        <input
                            id="photo"
                            name="photo"
                            type="url"
                            onChange={handleChange}
                            required={true}
                            value={formData.photo}
                        />
                        <div className="img-preview">
                            {formData.photo && (

                                <img src={formData.photo} alt="photo preview" />

                            )}
                        </div>
                    </section>

                </form>
            </div>
        </div>
    )
}

export default ReservationPage