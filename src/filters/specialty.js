export default function(value) {
  if (!value) return ''

  const mapSpecialty = {
    'al-audicionylenguaje': '[AL] Audición y lenguaje',
    as: '[AS] Audición y lenguaje',
    'ef-educacionfisica': '[EF] Educación física',
    'ei-educacioninfantil': '[EI] Educación infantil',
    'fi-lenguaextranjera:ingles': '[FI] Lengua extranjera inglés',
    'mu-musica': '[MU] Música',
    'pri-primaria': '[PRI] Primaria',
    ps: '[PS] Pedagogía terapéutica',
    'pt-pedagogiaterapeutica': '[PT] Pedagogía terapéutica',
    '001-primaria_ingles': '[001] Primaria inglés',
    '002-educacioninfantil_ingles': '[002] Educación infantil inglés',
    '003-musica_ingles': '[003] Música inglés',
    '004-educacionfisica_ingles': '[004] Educación física_inglés',
    '005-inglés_inglés': '[005] Inglés inglés',
  }
  return mapSpecialty[value]
}
