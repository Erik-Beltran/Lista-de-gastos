import React, { useState } from 'react'

const Header = ({ children, handlePresupuesto }) => {
    const [valuePresupuesto, setValuePresuesto] = useState("")

    const handleChangePresupuesto = (e) => {
        setValuePresuesto(e.target.value)

    }

    const handleSubmitPresupuesto = (e) => {
        handlePresupuesto(valuePresupuesto)
    }

    return (
        <div className="header">
            <h1 className="title">{children}</h1>
            <div class="control">
                <input class="input"
                    placeholder=" ingrese su presupuesto"
                    onChange={handleChangePresupuesto}
                />
                <button
                    class="button is-success"
                    onClick={handleSubmitPresupuesto}>
                    Confirmar
                    </button>
            </div>
        </div>
    )
}


export default Header;
