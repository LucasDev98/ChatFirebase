import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {
  constructor( public domSanitizer : DomSanitizer,
               public sanitizer : Sanitizer){

  }
  transform(value: string ): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl( value );
  }

}
