import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genero'
})
export class GeneroPipe implements PipeTransform {

  transform(value: string): string {

    if (value == '1') {
      return 'Mujer';
    } else {
      return 'Hombre';
    }

  }

}
