'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit as Edit, FaTrash as Trash } from 'react-icons/fa';
import { propEstilos } from "@/app/types/props";
import API_BASE from "@/app/services/api";


const Estilo = () => {
    const [estilos, setEstilos] = useState<propEstilos[]>([]);

    // Função para buscar os álbuns (atualizar a lista)
    const buscarAlbuns = async () => {
        try {
            const response = await fetch(`${API_BASE}/estilo/Editar`);
            const data = await response.json();
            setEstilos(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Função de exclusão
    const handleDelete = async (id: string) => {
      if (confirm("Tem certeza que deseja excluir?")) {
          try {
              const response = await fetch(`${API_BASE}/estilo/Editar/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
  
              if (response.ok) {
                  alert('Item excluído com sucesso!');
                  // Atualiza a lista após a exclusão
                  buscarAlbuns();
              } else {
                  const errorData = await response.json();
                  alert(`Erro ao excluir: ${errorData.message || 'Erro desconhecido'}`);
              }
          } catch (error) {
              console.error(error);
              alert('Erro na requisição');
          }
      }
  };
  

    // Carregar os albuns ao montar o componente
    useEffect(() => {
        buscarAlbuns();
    }, []);

    return (
        <>
            <h1>Estilos</h1>
            <Link href={`cadastrar/novo`}>Cadastrar novo Estilo</Link>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th colSpan={2}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {estilos.map((estilo, index) => (
                        <tr key={index}>
                            <td>
                                {estilo.estilo} 
                            </td>
                            <td>
                                <Link href={`cadastrar/${estilo.links}`}>
                                    <button><Edit /></button>
                                </Link>
                            </td>
                            <td>
                                <button title="Excluir" onClick={() => handleDelete(String(estilo.id))} disabled={Number(estilo.exibir) === 0} >
                                    <Trash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Estilo;
