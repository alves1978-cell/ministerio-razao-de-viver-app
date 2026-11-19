/**
 * Configurações principais do aplicativo Ministério Razão de Viver.
 *
 * MODO LOCAL (padrão): funciona imediatamente sem precisar configurar servidor ou banco.
 * MODO NUVEM (Supabase gratuito): basta preencher supabaseUrl e supabaseAnonKey abaixo
 * após rodar o arquivo supabase/schema.sql no seu projeto Supabase.
 */
export const CONFIG = {
  appName: 'Ministério Razão de Viver',
  shortName: 'Razão de Viver',

  // PIN padrão do Painel Administrativo no Modo Local (altere antes de publicar no modo local,
  // ou use Login com E-mail/Senha do Supabase ao ativar o Modo Nuvem).
  localAdminPin: '2026',

  // Preencha para conectar ao banco gratuito do Supabase (opcional para testes locais):
  supabaseUrl: '',
  supabaseAnonKey: '',
};
