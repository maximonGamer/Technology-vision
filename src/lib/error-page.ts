export function renderErrorPage(error?: unknown) {
  if (error) {
    console.error('Erro na página:', error);
  } else {
    console.error('Erro na página: nenhum erro fornecido');
  }
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Erro Interno</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            text-align: center;
            padding: 2rem;
          }
          h1 {
            color: #333;
            font-size: 2rem;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Erro Interno do Servidor</h1>
          <p>Desculpe, ocorreu um erro inesperado. Tente novamente mais tarde.</p>
        </div>
      </body>
    </html>
  `;
}

export function ErrorPage({ error }: { error?: unknown }) {
  return {
    status: 500,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: renderErrorPage(error)
  };
}