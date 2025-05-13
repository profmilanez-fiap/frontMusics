'use client';

import { useEffect, useState } from 'react';
import { propAlbuns } from '@/app/types/props'
import API_BASE from "@/app/services/api";
import Image from 'next/image';
import Link from 'next/link';


const Home = () => {
  const [Albums, setAlbums] = useState<propAlbuns[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${API_BASE}/album/aleatorios`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Erro ao buscar Albums aleatórios:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchAlbums();
  }, []);

  if (carregando) {
    return <h2>Carregando Albums aleatórios...</h2>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Albums.map((Album) => (
        <div key={Album.id} style={{ width: '200px', margin: '10px' }}>
          <Link href={`albuns/${Album.slug}`}>
            <Image
              src={`/imagens/${Album.imagem}`}
              alt={Album.album}
              title={Album.album}
              width={200}
              height={200}
              style={{ width: '100%', height: 'auto' }}
            />
            <h4>{Album.album}</h4>
          </Link>
          <p><strong>Banda:</strong> {Album.nomeBanda}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
