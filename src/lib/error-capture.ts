let lastCapturedError: unknown = null;

export function captureError(error: unknown) {
  console.error('Erro capturado:', error);
  lastCapturedError = error;
}

export function consumeLastCapturedError() {
  const error = lastCapturedError;
  lastCapturedError = null;
  return error;
}

export function setupErrorCapture() {
  if (typeof process !== 'undefined') {
    process.on('uncaughtException', (error) => {
      captureError(error);
    });

    process.on('unhandledRejection', (error) => {
      captureError(error);
    });
  }
}