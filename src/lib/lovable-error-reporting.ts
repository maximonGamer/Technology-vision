export function reportLovableError(
  error: unknown, 
  metadata?: { boundary?: string; [key: string]: unknown }
) {
  console.error('Erro reportado:', error, 'Metadata:', metadata);
  
  // Aqui você pode adicionar integração com serviços de monitoramento
  // como Sentry, LogRocket, etc.
  
  if (metadata?.boundary) {
    console.error(`Erro no boundary: ${metadata.boundary}`);
  }
}

export function initErrorReporting() {
  console.log('Inicializando relatório de erros...');
}