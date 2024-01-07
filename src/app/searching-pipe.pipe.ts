import { Pipe, PipeTransform } from '@angular/core';
import { ListingComponent } from './listing/listing.component';

@Pipe({
  name: 'searching'
})
export class SearchingPipePipe implements PipeTransform {

  Totallengths: any;
  PageNumber: number = 1;

  constructor(private the: ListingComponent) { }

  transform(items: any[], searchText: string) {
    if (items != null && searchText) {
      let arr = items.filter(el => {

        var test = JSON.parse(JSON.stringify(el));
        delete test['url'];
        delete test['_id'];

        var testString = JSON.stringify(test);

        Object.keys(test).forEach(k => {
          testString = testString.replace(k, '');
        });

        let terms = searchText.replace(/[\s]+/gm, " ").replace(/^[\s]|[\s]$/gm, "").split(' ');
        let containCount = 0;

        terms.forEach(t => {
          if (testString.toLowerCase().indexOf(t.toLowerCase()) > -1) {
            ++containCount;
          }
        });

        return (containCount == terms.length);
      });

      this.the.totalLength = arr.length

      return arr;

    } else {

      this.the.totalLength = items.length

      return items;
    }
  }

}
