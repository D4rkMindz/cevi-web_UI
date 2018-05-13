import { Injector } from '@angular/core';

let injectorReference: Injector;

export function injector(injectr?: Injector): Injector {
    if (injectr) {
    injectorReference = injectr;
  }
  return injectorReference;
}
