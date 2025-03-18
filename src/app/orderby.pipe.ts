import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderbyPipe implements PipeTransform {
  transform(array: any[], field: string, descending: boolean = false): any[] {
    if (!array || !field) return array;
    return array.sort((a, b) => {
      if (a[field] < b[field]) return descending ? 1 : -1;
      if (a[field] > b[field]) return descending ? -1 : 1;
      return 0;
    });
  }
}