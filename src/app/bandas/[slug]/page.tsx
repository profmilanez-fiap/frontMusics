'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { propBandas } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Banda = () => {
    const { slug } = useParams();
    const [banda, setBanda] = useState<propBandas | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarBanda = async () => {
            try {
                const response = await fetch(`${ API_BASE }/bandas/${slug}`);
                const data = await response.json();
                console.log("Slug:", slug);
                console.log("Resposta da API:", data);

                // Se a API retorna uma lista, pegue o primeiro item
                if (Array.isArray(data) && data.length > 0) {
                    setBanda(data[0]);
                } else if (!Array.isArray(data) && data?.banda) {
                    setBanda(data);
                } else {
                    setBanda(null);
                }
            } catch (error) {
                console.error("Erro ao buscar banda:", error);
                setBanda(null);
            } finally {
                setCarregando(false);
            }
        };

        if (typeof slug === "string") {
            buscarBanda();
        }
    }, [slug]);

    if (carregando) {
        return (
            <h2 className="text-xl font-bold mb-4">
                Carregando dados da banda...
            </h2>
        );
    }

    if (!banda) {
        return (
            <h2 className="text-xl font-bold mb-4 text-red-600">
                A banda procurada não foi encontrada.
            </h2>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{banda.banda}</h2>
            <Image src={`/imagens/${banda.imagem}`} alt={banda.banda} width={0} height={0}   sizes="100%" style={{ width: "auto", height: "auto" }}/>
            <p><strong>Categoria:</strong> {banda.categoria}</p>
            <p><strong>Integrantes:</strong> {banda.integrantes}</p>
            <p>{banda.descricao}</p>
        </div>
    );
};

export default Banda;
