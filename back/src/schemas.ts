import { z } from "zod";

export const limitSchema = z.coerce.number().int().min(1).max(50).default(4);

export const searchSchema = z.object({
  q: z.string().trim().min(2).max(100),
  type: z.enum(["artista", "banda", "evento", "espaco_cultural"]).optional()
});

export const writeSchemas = {
  artista: z.object({
    nome_artistico: z.string().min(2).max(150),
    bio_profissional: z.string().max(5000).nullable().optional(),
    foto_principal: z.string().url().nullable().optional(),
    data_inicio_atividade: z.string().date().nullable().optional(),
    generos_musicais: z.array(z.string().min(1)).default([])
  }),
  banda: z.object({
    nome_banda: z.string().min(2).max(150),
    descricao: z.string().min(1).max(5000),
    data_formacao: z.string().date(),
    foto_principal: z.string().url().nullable().optional(),
    generos_musicais: z.array(z.string().min(1)).default([])
  }),
  espaco_cultural: z.object({
    nome_espaco: z.string().min(2).max(150),
    descricao: z.string().min(1).max(5000),
    site: z.string().url().nullable().optional(),
    horario_funcionamento: z.record(z.string(), z.string()).default({}),
    capacidade_maxima: z.number().int().positive().nullable().optional(),
    publico: z.boolean().default(true),
    endereco: z.string().max(255).nullable().optional(),
    foto_principal: z.string().url().nullable().optional()
  }),
  evento: z.object({
    nome_evento: z.string().min(2).max(150),
    descricao: z.string().min(1).max(5000),
    data_evento: z.string().date(),
    hora_inicio: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
    hora_fim: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).nullable().optional(),
    url_cartaz: z.string().url().nullable().optional(),
    link_ingresso: z.string().url().nullable().optional(),
    preco_ingresso: z.number().nonnegative().default(0),
    fk_id_espaco_cultural: z.coerce.string().min(1),
    foto_principal: z.string().url().nullable().optional()
  })
};
