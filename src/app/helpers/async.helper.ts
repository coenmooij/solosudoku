export function wrapInPromise<Response>(callback: () => Response): Promise<Response> {
  return new Promise<Response>((resolve: (response: Response) => void) => resolve(callback()));
}
