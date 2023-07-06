import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../Redux/actions/actions";
import validate from "./validate";

import s from "./FormPage.module.css";
import logo from "../img/penrose-square.png";

export default function FormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    console.log(input);
  }

  const handleSelect = (event) => {
    setInput((prevState) => {
      if (event.target.name === "countries") {
        if (prevState.countries.includes(event.target.value)) {
          return prevState;
        }
        return {
          ...prevState,
          countries: [...prevState.countries, event.target.value],
        };
      } else {
        return {
          ...prevState,
          [event.target.name]: event.target.value,
        };
      }
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(input);
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries
    ) {
      return alert("Complete correctamente el formulario antes de enviarlo");
    }
    try {
      dispatch(postActivity(input));
      alert("Actividad Creada Exitosamente");
    } catch (error) {
      console.log(error);
      alert("La actividad ya existe.");
    }
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    navigate("/home");
  }

  function handleDelete(event) {
    setInput((prevState) => ({
      ...prevState,
      countries: prevState.countries.filter((country) => country !== event),
    }));
  }

  function handleClick(event) {
    event.preventDefault();
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Link to="/home">
          <img
            className={s.logo}
            onClick={(event) => handleClick(event)}
            src={logo}
            alt="logo"
          ></img>
        </Link>
      </div>
      <div className={s.formContainer}>
        <h2 className={s.title}>Crea tu Actividad Turística</h2>
        <form className={s.form} onSubmit={(event) => handleSubmit(event)}>
  <div className={s.inputContainer}>
    <label className={s.label}>Nombre:</label>
    <input
      className={s.input}
      type="text"
      value={input.name}
      name="name"
      onChange={(e) => handleChange(e)}
    />
    {errors.name && <p className={s.error}>{errors.name}</p>}
  </div>
  <div className={s.inputContainer}>
    <label className={s.label}>País:</label>
    <select
      className={s.input}
      name="countries"
      id="countries"
      onChange={(e) => handleSelect(e)}
    >
      <option value="">Seleccionar país</option>
      {countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
    </select>
    {errors.countries && <p className={s.error}>{errors.countries}</p>}
  </div>
  <div className={s.inputContainer}>
    <label className={s.label}>Temporada:</label>
    <select
      className={s.input}
      name="season"
      id="season"
      onChange={(e) => handleSelect(e)}
    >
      <option value="">Seleccionar temporada</option>
      <option value={"Summer"}>Verano 🌞</option>
      <option value={"Winter"}>Invierno ❄️</option>
      <option value={"Spring"}>Primavera 🌸</option>
      <option value={"Autumn"}>Otoño 🍂</option>
    </select>
    {errors.season && <p className={s.error}>{errors.season}</p>}
  </div>
  <div className={s.inputContainer}>
    <label className={s.label}>Dificultad:</label>
    <input
      className={s.input}
      type="number"
      value={input.difficulty}
      name="difficulty"
      onChange={(e) => handleChange(e)}
      min="1"
      max="5"
    />
    {errors.difficulty && (
      <p className={s.error}>{errors.difficulty}</p>
    )}
  </div>
  <div className={s.inputContainer}>
    <label className={s.label}>Duración:</label>
    <input
      className={s.input}
      type="number"
      value={input.duration}
      name="duration"
      onChange={(e) => handleChange(e)}
      min="1"
      max="24"
    />
    <label className={s.label}>horas</label>
    {errors.duration && <p className={s.error}>{errors.duration}</p>}
  </div>
  <div>
    <button
      className={s.submitButton}
      type="submit"
      disabled={Object.keys(errors).length === 0 ? false : true}
    >
      Añadir Actividad
    </button>
  </div>
</form>


        {input.countries.map((country) => (
          <div key={country.id} className={s.countryContainer}>
            <p className={s.country}>{country}</p>
            <button className={s.deleteButton} onClick={() => handleDelete(country)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
