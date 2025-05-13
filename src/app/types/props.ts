export interface propEstilos {
    id          :   string;
    estilo      :   string;
    links       :   string;
    exibir      :   string;
}

export interface propAlbuns {
    id          :   number;
    album       :   string;
    banda       :   string;
    categoria   :   string;
    imagem      :   string;
    lancamento  :   string;
    faixas      :   string;
    exibir      :   number;
    integrantes?:   string;
    nomeBanda   :   string;
    descricao   :   string;
    links       :   string;
    slug        :   string;
    nomeEstilo  :   string;
    slugBanda  ?:   string;
}

export interface propBandas {
    id          :   string;
    banda       :   string;
    integrantes :   string;
    descricao   :   string;
    links       :   string;
    slug        :   string;
    imagem      :   string;
    categoria   :   string;
    exibir      :   string;
}

