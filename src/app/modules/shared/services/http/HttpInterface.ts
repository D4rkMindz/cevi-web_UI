import { HttpParams } from '@angular/common/http';

export interface HttpServiceInterface {
  get(url: string, params?: HttpParams);

  post(url: string, body, params?: HttpParams);

  put(url: string, body, params?: HttpParams);

  delete(url: string, params?: HttpParams);
}
