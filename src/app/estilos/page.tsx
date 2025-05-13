'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { propEstilos } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Estilo = () =>{
    
    const [estilos, setEstilos] = useState<propEstilos[]>([]);      

    useEffect(()=>{
        const buscarAlbuns = async() =>{
            try{
                const response = await fetch(`${API_BASE}/estilo`);
                const data = await response.json();
                setEstilos(data)
            }
            catch(error){
                console.error(error);
            }
        }
        buscarAlbuns();
    }, [])
    return (
        <>
            <h1>Estilos Musicais</h1>
            <p><Link href={`estilos/editar/`}>Editar Estilos Musicais</Link></p>
            <ul>
                {estilos.map((estilo, index) => (
                    <li key={ index }><Link href={`estilos/${estilo.links}`}>{ estilo.estilo }</Link></li>
                ))
            }
            </ul>
        </>
    )
}
export default Estilo;