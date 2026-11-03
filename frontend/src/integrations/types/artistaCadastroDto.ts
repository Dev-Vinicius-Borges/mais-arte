export type ArtistaCadastroDto = {
    nomeArtistico: string;
    bioProfissional: string | null;
    dataInicioAtividade: string | null;
    generosMusicais: string[];
    fotoPrincipal: string | null;
};