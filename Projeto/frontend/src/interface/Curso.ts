export interface Curso {
  id_curso: number;
  nome_curso: string;
  qtd_horas: number;
  link_certificado: string;
  alunos: string[];  // Nome dos alunos
  status?: "andamento" | "finalizado";
}
