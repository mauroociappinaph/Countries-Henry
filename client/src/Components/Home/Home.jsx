import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinents,
  orderByName,
  orderByPop,
  filterByAct,
  getActivities,
} from "../../Redux/actions/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";

import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.allActivities);
  const [currentPage, setCurrentPage] = useState(1);
  let [countriesPerPage, setCountriesPerPage] = useState(10);

  const [continent, setContinent] = useState("");
  const [sort, setSort] = useState("");
  const [population, setPopulation] = useState("");
  const [activity, setActivity] = useState("");

  const indexOfLastCountrie = currentPage * countriesPerPage;
  const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountrie,
    indexOfLastCountrie
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleFilteredCountrie(event) {
    setContinent(event.target.value);
    dispatch(filterByContinents(event.target.value));
  }

  function handleSort(event) {
    event.preventDefault();
    setSort(event.target.value);
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
  }

  function handleSortPop(event) {
    event.preventDefault();
    setPopulation(event.target.value);
    dispatch(orderByPop(event.target.value));
    setCurrentPage(1);
  }

  function handleFilterByAct(event) {
    event.preventDefault();
    setActivity(event.target.value);
    dispatch(filterByAct(event.target.value));
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSort("All");
    setPopulation("All");
    setContinent("All");
    setActivity("All");
    setCurrentPage(1);

    return dispatch(getCountries());
  }

  return (
    <div className={style.container}>
      <div>
        <NavBar setCurrentPage={setCurrentPage} />
      </div>

      <div className={style.filtros}>
        <div>
          Orden Alfabético
          <select
            className={style.select}
            onChange={(e) => handleSort(e)}
            value={sort}
          >
            <option value={sort === "All" ? sort : "All"}>Todos</option>
            <option value={sort === "asc" ? sort : "asc"}>Ascendente</option>
            <option value={sort === "desc" ? sort : "desc"}>Descendente</option>
          </select>
        </div>
        <div>
          Número de Habitantes
          <select
            className={style.select}
            onChange={(e) => handleSortPop(e)}
            value={population}
          >
            <option value={population === "All" ? population : "All"}>
              Todos
            </option>
            <option value={population === "mayp" ? population : "mayp"}>
              Menor a Mayor
            </option>
            <option value={population === "menp" ? population : "menp"}>
              Mayor a Menor
            </option>
          </select>
        </div>
        <div>
          Busca por Continentes
          <select
            className={style.select}
            onChange={(e) => handleFilteredCountrie(e)}
            value={continent}
          >
            <option value={continent === "All" ? continent : "All"}>
              Todos
            </option>
            <option value={continent === "Americas" ? continent : "Americas"}>
              Americas
            </option>
            <option value={continent === "Africa" ? continent : "Africa"}>
              África
            </option>
            <option value={continent === "Asia" ? continent : "Asia"}>
              Asia
            </option>
            <option value={continent === "Europe" ? continent : "Europe"}>
              Europa
            </option>
            <option value={continent === "Oceania" ? continent : "Oceania"}>
              Oceanía
            </option>
            <option
              value={continent === "Antarctica" ? continent : "Antarctica"}
            >
              Antarctica
            </option>
          </select>
        </div>
        <div>
          Busca por Actividad
          {activities.length === 0 ? (
            <p>No se han creado actividades</p>
          ) : (
            <select
              className={style.select}
              onChange={(e) => handleFilterByAct(e)}
              value={activity}
            >
              <option value={activity === "All" ? activity : "All"}>
                Todas
              </option>
              <option value={activity === "none" ? activity : "none"}></option>
              {activities.map((e) => (
                <option
                  value={activity === e.name ? activity : e.name}
                  key={e.id}
                >
                  {e.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <button
            className={style.buttonClearFilters}
            onClick={handleClearFilters}
          >
            Borrar filtros
          </button>
        </div>
      </div>
      <div className={style.contenedorCards}>
        {currentCountries.length ? (
          currentCountries.map(({ name, index, imgFlag, id, continent }) => {
            return (
              <div key={id} className={style.Card}>
                <Card
                  imgFlag={imgFlag}
                  name={name}
                  continent={continent}
                  key={index}
                  id={id}
                />
              </div>
            );
          })
        ) : (
          <h1>No hay países</h1>
        )}
      </div>
      <div className={style.paginado}>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
