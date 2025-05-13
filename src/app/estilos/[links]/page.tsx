'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { propAlbuns, propEstilos } from "@/app/types/props";
import API_BASE from "@/app/services/api";


const Estilos = () => {

    const params = useParams();
    const [albuns, setAlbuns] = useState<propAlbuns[]>([]);
    const [nomeEstilo, setNomeEstilo] = useState<string>("");

    useEffect(() => {
        const buscarEstilo = async () => {
            try {
                const response = await fetch(`${ API_BASE }/estilo/${params.links}`);
                const data: propEstilos = await response.json();
                setNomeEstilo(data.estilo);
            } catch (error) {
                console.error("Erro ao buscar estilo:", error);
            }
        };

        if (params?.links) {
            buscarEstilo();
        }
    }, [params?.links]);

    useEffect(() => {
        const buscarAlbuns = async () => {
            try {
                const response = await fetch(`${ API_BASE }/album/buscarporcategoria/${params.links}`);
                const data = await response.json();
                setAlbuns(data);
            } catch (error) {
                console.error("Erro ao buscar álbuns:", error);
            }
        };

        if (params?.links) {
            buscarAlbuns();
        }
    }, [params?.links]);

    return (
        <>
            <h1>Busca por Estilo {nomeEstilo && `- ${nomeEstilo}`}</h1>

            {albuns.length === 0 ? (
                <h2>Não existem álbuns para o estilo selecionado!</h2>
            ) : (
                <ul>
                    {albuns.map((album, index) => (
                        <li key={index}>
                            <Link href={`/albuns/${album.slug}`}>{album.album}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Estilos;
