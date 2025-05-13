'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { propBandas } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Bandas = () =>{
    
    const [bandas, setBandas] = useState<propBandas[]>([]);      

    useEffect(()=>{
        const buscarBandas = async() =>{
            try{
                const response = await fetch(`${API_BASE}/bandas`);
                const data = await response.json();
                setBandas(data)
            }
            catch(error){
                console.error(error);
            }
        }
        buscarBandas();
    }, [])
    return (
        <>
            <h1>Bandas</h1>
            <p>
                <Link href={`bandas/editar/`}>Editar Bandas</Link>
            </p>
            <ul>
                {bandas.map((banda, index) => (
                    <li key={ index }><Link href={`bandas/${banda.slug }`}>{ banda.banda }</Link></li>
                ))
            }
            </ul>
        </>
    )
}
export default Bandas;