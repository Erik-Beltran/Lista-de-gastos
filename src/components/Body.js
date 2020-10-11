import React, { useState } from 'react'


const Body = ({ presupuesto, restante, arrayGastos, newGasto, handleResetFN }) => {

    const [descriptionGasto, setDescriptionGasto] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleChangeDescription = (e) => {
        setDescriptionGasto(e.target.value)
    }

    const handleCantidad = e => {
        setCantidad(e.target.value)
    }

    const HandleSubmit = (e) => {
        newGasto(descriptionGasto, cantidad)
        setDescriptionGasto("")
        setCantidad("")
    }

    return (
        <div className="body">
            <div className="gastosInfo">
                <h2 class="subtitle">Añade tus gastos</h2>
                <div class="field">
                    <label for="gasto" class="label">Gasto</label>
                    <div class="control">
                        <input
                            id="gasto"
                            class="input"
                            type="text"
                            placeholder="Nombre del Gasto"
                            onChange={handleChangeDescription}
                            value={descriptionGasto}
                        />
                    </div>
                </div>
                <div class="field">
                    <label for="cantidad" class="label">Cantidad</label>
                    <div class="control">
                        <input
                            id="cantidad"
                            class="input"
                            type="text"
                            placeholder="Cantidad en $"
                            value={cantidad}
                            onChange={handleCantidad}
                        />
                    </div>
                </div>
                <div class="control">
                    <button
                        class="button is-link"
                        onClick={HandleSubmit}> Añadir
                    </button>
                </div>

            </div>
            <div className="listado">
                <h2 class="subtitle">Listado</h2>
                <Listado array={arrayGastos}></Listado>
                <div class="control">
                    <input class="input"
                        value={`Presupuesto: ${presupuesto} $`}
                    />
                </div>
                <div class="control">
                    <input class="input" id="restante"
                        value={`Restante: ${restante} $`}
                        disabled
                    />
                </div>
                <button
                    class="button is-danger"
                    onClick={handleResetFN}>
                    Nueva semana
                    </button>
            </div>
        </div>

    )
}

const Listado = ({ array }) => {
    return (
        <div className="listaGastos">
            <ol>
                {array.map(item =>
                    <li className="listItem">
                        <p> {item.descripcion} </p>
                        <p> <strong>{item.cantidad} $ </strong></p>
                    </li>)
                }

            </ol>

        </div>
    )
}
export default Body;
