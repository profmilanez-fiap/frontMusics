'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { propEstilos,propBandas } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const BandaPage = () => {
  const params = useParams();
  const slugParam = params.slug;
  const isEdit = slugParam !== 'novo';
  const slug = isEdit ? slugParam : undefined;

  const [formData, setFormData] = useState<propBandas>({
    id: '0',
    banda: '',
    integrantes: '',
    links: '',
    slug: '',
    imagem: '',
    descricao: '',
    categoria: '', // Inicializa a categoria como string vazia
    exibir: '', // Inicializa exibir como string vazia
  });

  const [estilos, setEstilos] = useState<propEstilos[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    // Carregar categorias primeiro
    fetch(`${ API_BASE }/estilo/`)
      .then((res) => res.json())
      .then((data) => setEstilos(data))
      .catch(() => setMensagem('Erro ao carregar categorias'));

    // Carregar banda, se for edição
    if (isEdit && slug) {
      fetch(`${ API_BASE }/bandas/editar/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setFormData({
              id: data[0].id,
              banda: data[0].banda,
              integrantes: data[0].integrantes,
              links: data[0].links,
              slug: data[0].slug,
              imagem: data[0].imagem,
              descricao: data[0].descricao,
              exibir : data[0].exibir,
              categoria: String(data[0].categoria || ''),
            });
          }
          console.log(data);
        })
        .catch(() => setMensagem('Erro ao carregar a banda'));
    }
  }, [slug, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEdit
      ? `${ API_BASE }/bandas/atualizar/${formData.id}`
      : `${ API_BASE }/bandas/cadastrar`;

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
        setMensagem(isEdit ? 'Banda atualizada com sucesso!' : 'Banda cadastrada com sucesso!');
        if (!isEdit) {
          setFormData({
            id: '0',
            banda: '',
            integrantes: '',
            links: '',
            slug: '',
            imagem: '',
            descricao: '',
            categoria: '', // Limpar categoria após sucesso
            exibir: '' // Limpar exibir após sucesso
          });
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
        {isEdit ? 'Editar Banda' : 'Cadastrar Nova Banda'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome da Banda</label>
          <input
            type="text"
            name="banda"
            value={formData.banda || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Integrantes</label>
          <input
            type="text"
            name="integrantes"
            value={formData.integrantes || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Imagem (URL)</label>
          <input
            type="text"
            name="imagem"
            value={formData.imagem || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Categoria</label>
          <select
            name="categoria"
            value={formData.categoria || ''} // Garante que o valor nunca será null ou undefined
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione um Estilo musical</option>
            {estilos.map((estilo) => (
              <option key={estilo.id} value={estilo.id}>
                {estilo.estilo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Exibir (1 = Sim, 0 = Não)</label>
          <select 
            name="exibir" 
            value={formData.exibir}
            onChange={handleChange}
            className="w-full p-2 border rounded">
              <option value={1}>Exibir</option>
              <option value={0}>Ocultar</option>
          </select>
          <input
            type="hidden"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      {mensagem && <p className="mt-4 text-center text-green-600">{mensagem}</p>}
    </div>
  );
};

export default BandaPage;
