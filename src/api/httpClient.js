export class ApiError extends Error {
  constructor(message, { status, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getJson(url, { timeoutMs = 8000, retries = 0 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.message || 'Request failed.', { status: response.status });
      }

      return data;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      const message = error.name === 'AbortError'
        ? 'The weather request timed out. Please try again.'
        : error.message || 'Unable to reach the weather service.';

      if (isLastAttempt) {
        throw error instanceof ApiError ? error : new ApiError(message, { cause: error });
      }

      await wait(300);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new ApiError('Unable to reach the weather service.');
}
