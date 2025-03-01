import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(MyArr:any[], text:string): any[] {
    return MyArr.filter((item) => item.title.toLowerCase().includes(text.toLocaleLowerCase()));
  }

}
