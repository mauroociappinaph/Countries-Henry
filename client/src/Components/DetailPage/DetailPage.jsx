import {React, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail } from "../../Redux/actions/actions";

import s from "./DetailPage.module.css"
import logo from "../img/penrose-square.png";

export default function DetailPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const country = useSelector((state) => state.detail);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getCountriesDetail(id))
    },[dispatch, id])

    function handleClick(){
        navigate("/home")
    }

    return (
        
        <div className={s.prindiv}>

            <div className={s.bar}>
            <Link to= "/home">
                <img className={s.bothome} 
            onClick={(e) => handleClick(e)} 
            src={logo} alt="logo"></img>
            </Link>
            </div>

            <div className={s.cardd}>

                <div className={s.conpais} >
                <h2 className={s.titulod}>Detalles del País</h2>
            {
                country ?
                <div >
                    <img className={s.banderad} src={country.imgFlag} alt="Imagen no disponible" />
                    <h2 className={s.nombred}>{country.name}</h2>
                    <h4 className={s.continented}>{country.continent}</h4>
                    <h4 className={s.codigo}>{country.id}</h4>
                    <h4 className={s.detalle}>Capital: {country.capital}</h4>
                    <h4 className={s.detalle}>Región: {country.subregion}</h4>
                    <h4 className={s.detalle}>Área: {country.area} km²</h4>
                    <h4 className={s.detalle}>Población: {country.population}</h4>
                   
                </div> : <p>Loading ...</p>
            }
                </div>

            <div className={s.conact}>
            <h3 className={s.titulod}>Actividades del País</h3>
            {
                country.Activities&&country.Activities.length ? 
            country.Activities?.map(e => {
                return (
                        <div key={e.id}>
                            <h4 className={s.nombreact}>{e.name}</h4>
                            <p className={s.detalle}>Dificultad: {e.difficulty}</p>
                            <p className={s.detalle}>Duración: {e.duration} horas</p>
                            <p className={s.detalle}>Temporada: {e.season}</p>
                        </div>
                        
                    ) 
                 }) 
                 : <p>No existen actividades en este país</p> 
            }
             <Link to="/activities"><button className={s.botactd}>Crear Actividad</button></Link>               
            </div>
            </div>
        </div>
    )
};