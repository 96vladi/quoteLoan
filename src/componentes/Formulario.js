import React, { useState, Fragment } from 'react';
import { calcularTotal } from "../helpers";

const Formulario = (props) => {

    const { cantidad, guardarCantidad, plazo, guardarPlazo , guardarTotal, guardarCargando} = props;
        //Definir el state
    //No podremos usar esata constante de aqui a un padre debemos moverla
    // const [cantidad, guardarCantidad]= useState(0);


    /* En caso de crear una funcion */
    // const leerCantidad = (e) => {
    //     // console.log(e.target.value);
    //     guardarCantidad( parseInt( e.target.value ) );
    // }
    /* Aqui termina la funcion */

    const [ error, guardarError ] = useState(false);


    //Cuando el usuario hace submit
    const calcularPrestamo = (e) => {
        e.preventDefault();
        // console.log("Enviando formulario");

        //Validar

        if ( cantidad === 0 ||  plazo === '') {
            // console.log("Hay un error");
            guardarError(true);
            return;
        }
        //Eliminar el error previo
        guardarError(false);

        //Para realizar el spinner
        guardarCargando(true);

        //Para realizar los calculos despues de 3 segundos
        setTimeout(()=>{
             // Realizar la cotizacion
            const total = calcularTotal(cantidad, plazo);
        

            //Una vez calculado guardar total
            guardarTotal(total);

            // Deshabilirar el spinner
            guardarCargando(false);
        }, 3000);

    }

    return (
        <Fragment>
            <form onSubmit = { calcularPrestamo }>
            { cantidad }
                <div className="row">
                    <div>
                        <label>Cantidad Prestamo</label>
                        <input
                            className="u-full-width" 
                            type="number" 
                            placeholder="Ejemplo: 3000"
                            /*En caso de crear un funcion */
                            // onChange = { leerCantidad } 
                            /* Aqui termina el llamado */
                            /* De manera directa sin crear una funcion */
                            onChange = { e => guardarCantidad( parseInt( e.target.value ) ) }
                        />
                    </div>
                    <div>
                        <label>Plazo para Pagar</label>
                        <select 
                            className="u-full-width"
                            onChange = { e => guardarPlazo( parseInt( e.target.value ) ) }
                        >
                            <option value="">Seleccionar</option>
                            <option value="3">3 meses</option>
                            <option value="6">6 meses</option>
                            <option value="12">12 meses</option>
                            <option value="24">24 meses</option>
                        </select>
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            value="Calcular" 
                            className="button-primary u-full-width" 
                        />
                    </div>
                </div>
            </form>
            {/* cuando error este en true ejecuta el codigo caso contrario nada */}
            { (error) ?  <p className="error">Todos los campos son obligatorios</p> : ''}
        </Fragment>
    );

}

export default Formulario;