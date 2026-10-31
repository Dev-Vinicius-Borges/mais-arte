export type ApiEvento = {
  id: number; nomeEvento: string; descricao: string;
  dataEvento: string; horaInicio: string;
  endereco: string; fotoPrincipal: string | null;
};
export type ApiArtista = {
  id: number; nomeArtistico: string | null; bioProfissional: string | null;
  generosMusicais: string[]; fotoPrincipal: string | null;
};
export type ApiEspaco = {
  id: number; nomeEspaco: string; descricao: string;
  endereco: string | null; fotoPrincipal: string | null;
};