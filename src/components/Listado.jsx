import React, {useState} from 'react';
import uniqid from 'uniqid'

export const Listado = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListanombres] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (e)=>{
        e.preventDefault()
        if(!nombre.trim()){
            setError('El campo esta vacio')
            return
        }
        const nuevoNombre = {
            id:uniqid(),
            tituloNombre:nombre
        }
        setListanombres([...listanombres,nuevoNombre])
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) =>{
        const nuevoArray = listanombres.filter(item => item.id !== id)
        setListanombres(nuevoArray)
    }

    const editar = (item) => {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = (e) => {
        e.preventDefault()
        const nuevoArray = listanombres.map( item => item.id === id ? {id:item.id, tituloNombre:nombre}: item)
        setListanombres(nuevoArray)
        setModoEdicion(false)
        setNombre('')
    }


  return (
    <div>
        <h2 className='text-center text-primary'>Aplicacion Crud REACT</h2><br />
        <div className='row'>
            <div className='col'>
                <h2>Listado de Nombres</h2>
                <ul className='list-group'>
                    {
                        listanombres.map(item => 
                            
                            <li  key="{item.id}" className='list-group-item'>{item.tituloNombre}
                                <button onClick={() => {deleteNombre(item.id)}} className='btn btn-danger float-end'>
                                    Borrar
                                </button>
                                <button onClick={() => {editar(item)}} className='btn btn-warning float-end'>
                                    Editar
                                </button>
                            </li>
                            
                        )
                    }
                </ul>
            </div>
            <div className='col'>
                <h2>Formulario {modoEdicion ? 'Editar' : 'Registrar'}</h2>
                <form onSubmit={modoEdicion ? editarNombre : addNombre} className='d-grid'>
                    <input onChange={(e)=>(setNombre(e.target.value))} className='form-control mb-3' type="text" placeholder='Nombre' value={nombre}/>
                    
                    <input className='btn btn-info text-white' type="submit" value={modoEdicion ? 'Editar Nombre' : 'Registrar Nombre'}/>
                </form>
                {
                    error != null ? (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <div>
                                {error}
                            </div>
                        </div>
                    ):
                    (
                        <div></div>
                    )
                }
            </div>
        </div>
    </div>
  );
};
export default Listado