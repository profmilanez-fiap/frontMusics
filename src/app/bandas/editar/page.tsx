'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit as Edit, FaTrash as Trash } from 'react-icons/fa';
import { propBandas } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Bandas = () => {
  const [bandas, setBandas] = useState<propBandas[]>([]);

  // Mover para fora do useEffect
  const buscarBandas = async () => {
    try {
      const response = await fetch(`${ API_BASE }/bandas/editar`);
      const data = await response.json();
      console.log(data);
      setBandas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarBandas();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        const response = await fetch(`${ API_BASE }/bandas/excluir/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          alert('Item excluído com sucesso!');
          buscarBandas();
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

  return (
    <>
      <h1>Bandas</h1>
      <Link href={`cadastrar/novo`}>
        Cadastro de Nova Banda
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome da Banda</th>
            <th colSpan={2}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {bandas.map((banda, index) => (
            <tr key={index}>
              <td>{banda.banda}</td>
              <td>
                <Link href={`cadastrar/${banda.slug}`}>
                  <button><Edit /></button>
                </Link>
              </td>
              <td>
                <button
                  title="Excluir"
                  onClick={() => handleDelete(Number(banda.id))}
                  disabled={Number(banda.exibir) === 0}
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Bandas;
