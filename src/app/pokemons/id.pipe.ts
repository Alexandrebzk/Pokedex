import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(value: number, prefix?: string): string {
    const zerosToAdd = 3 - value.toString().length;
    let res = '';
    if (prefix) {
      res += prefix + ' ';
    }
    for (let i = 0; i < zerosToAdd; i++) {
      res += '0';
    }
    res += value.toString();
    return res;
  }

}
