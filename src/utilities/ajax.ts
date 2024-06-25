type ErrorMessage = {
  message: string;
};

class AjaxError extends Error {
  statusCode: number;
  errors: ErrorMessage[];

  constructor(
    statusCode: number,
    message: string,
    errors: ErrorMessage[] = []
  ) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

type AjaxMethod = "GET" | "POST" | "PUT" | "DELETE";

export const ajax = async <T>(
  method: AjaxMethod,
  url: string,
  data?: object
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const body = await response.json();
  if (response.ok) {
    return body as T;
  }

  throw new AjaxError(
    response.status,
    body.message ?? response.statusText,
    body.errors
  );
};
