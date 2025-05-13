'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API_BASE from "@/app/services/api";

const EstiloPage = () => {
  const params = useParams();
  const linksParam = params.links;
  const isEdit = linksParam !== 'novo';
  const links = isEdit ? String(linksParam) : undefined;

  const [formData, setFormData] = useState({
    id : 0,
    links : '',
    estilo : '',
    exibir : 1
  });

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (isEdit && links) {
      fetch(`${API_BASE}/estilo/${links}`)
        .then(res => {
          if (!res.ok) throw new Error('Não encontrado');
          return res.json();
        })
        .then(data => {
          setFormData({
            id: data.id,
            links: data.links,
            estilo: data.estilo,
            exibir: data.exibir
          });
        })
        .catch(() => setMensagem('Erro ao carregar o estilo'));
    }
  }, [links, isEdit]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'exibir' ? Number(e.target.value) : e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEdit
      ? `${API_BASE}/estilo/${links}`
      : `${API_BASE}/estilo`;

    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMensagem(isEdit ? 'Estilo atualizado com sucesso!' : 'Estilo cadastrado com sucesso!');
        if (!isEdit) {
          setFormData({ id: 0, links  : '', estilo: '', exibir: 1 });
        }
      } else {
        const erro = await response.text();
        setMensagem(`Erro ao salvar: ${erro}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro na requisição.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? 'Editar Categoria' : 'Cadastrar Nova Categoria'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Estilo</label>
          <input type="text"
            name="estilo"
            value={formData.estilo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Exibir</label>
          <select name="exibir" value={formData.exibir} onChange={handleChange} className="w-full p-2 border rounded">
          <option value={1}>Exibir</option>
          <option value={0}>Ocultar</option>
        </select>
          <input type="hidden"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {mensagem && <p className="mt-4 text-center text-green-600">{mensagem}</p>}
    </div>
  );
};

export default EstiloPage;
