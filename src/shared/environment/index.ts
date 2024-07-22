export const Environment = {
  /**
   * URL base da aplicação
   */
  URL_BASE: process.env.REACT_APP_API_URL || 'http://localhost:3333',

  /**
   * Placeholder das inputs do campo de pesquisa
   */
  SEARCH_INPUT: 'Search...',

  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  ROW_LIMIT: 4,

  /**
   * Texto exibido quando nenhum registro é encontrado
   */
  EMPTY_LISTING: 'No records found',
};