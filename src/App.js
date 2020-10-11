import React, { useState, useEffect } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import Header from './components/Header'
import Body from './components/Body'

function App() {

  const [presupuesto, setPresuesto] = useState("")
  const [arrayGastos, setArrayGastos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  var [totalGastos, setTotalGastos] = useState(0)

  const handlePresupuesto = (value) => {
    validarPresupuestoInicial(value)
  }

  const newGasto = (descripcion, cantidad) => {
    validarGasto(descripcion, cantidad)
    setTotalGastos(totalGastos += Number(cantidad))
  }

  const reset=(e)=>{
    setArrayGastos([])
    setPresuesto("")
    setTotalGastos("")
  }
 
  const validarPresupuestoInicial = (presupuesto) => {
    const mensajes = document.getElementById("mensajes");
    if (presupuesto === "") {
      setMensaje("Debe ingresar un presupuesto inicial!")
      mensajes.style.display = "block"
      setTimeout(() => {
        mensajes.style.display = "none"
      }, 4000);

    } else if (isNaN(presupuesto)) {
      setPresuesto("")
      setMensaje("El presupuesto debe ser un valor numerico")
      mensajes.style.display = "block"
      setTimeout(() => {
        mensajes.style.display = "none"
      }, 4000);
    } else {
      setPresuesto(presupuesto)
    }

  }

  const validarGasto = (descripcion, cantidad) => {
    const mensajes = document.getElementById("mensajes");
    if (cantidad === "") {
      setMensaje("Debe ingresar una cantidad en $")
      mensajes.style.display = "block"
      setTimeout(() => {
        mensajes.style.display = "none"
      }, 4000);

    } else if (isNaN(cantidad)) {
      setMensaje("La cantidad debe ser un valor numerico")
      mensajes.style.display = "block"
      setTimeout(() => {
        mensajes.style.display = "none"
      }, 4000);

    } else if (descripcion === "") {
      setMensaje("Debe ingresar una descripción")
      mensajes.style.display = "block"
      setTimeout(() => {
        mensajes.style.display = "none"
      }, 4000);

    } else {
      setArrayGastos([...arrayGastos, { descripcion: descripcion, cantidad: cantidad }])
    }
  }


  useEffect(() => {
    const mostrarPorcentaje = document.getElementById("restante")
    if ((presupuesto / 4) > (presupuesto - totalGastos)) {
      mostrarPorcentaje.style.background = "rgba(255, 0, 0, 0.2)"
    } else if ((presupuesto / 2) > (presupuesto - totalGastos)) {
      mostrarPorcentaje.style.background = "rgba(255, 255, 0, 0.4)"
    } else {
      mostrarPorcentaje.style.background = "rgba(0, 255, 0, 0.2)"
    }
  }, [totalGastos])

  useEffect(() => {
    let gastos = localStorage.getItem('gastos');
    let presupuesto = localStorage.getItem('presupuesto')
    let totalGastos = localStorage.getItem('totalGastos')

    if (gastos != null) {
      setArrayGastos(JSON.parse(gastos))
    }
    if (presupuesto != null) {
      setPresuesto(JSON.parse(presupuesto))
    }
    if (totalGastos != null) {
      setTotalGastos(JSON.parse(totalGastos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(arrayGastos))
  }, [arrayGastos])

  useEffect(() => {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto))
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('totalGastos', JSON.stringify(totalGastos))
  }, [totalGastos])

  return (
    <div className="App">
      <Header handlePresupuesto={handlePresupuesto}>Gasto Semanal</Header>
      <Mensaje mensaje={mensaje} />

      <Body
        presupuesto={presupuesto}
        arrayGastos={arrayGastos}
        restante={presupuesto - totalGastos}
        newGasto={newGasto}
        handleResetFN={reset}>
      </Body>
    </div>
  );
}

const Mensaje = ({ mensaje }) => {
  return (
    <div >
      <article class="message is-warning" id="mensajes">
        <div class="message-header">
          <p>Warning</p>
        </div>
        <div class="message-body">
          {mensaje}
        </div>
      </article>
    </div>
  )
}

export default App;
