import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstkey',
  standalone: true
})
export class FirstkeyPipe implements PipeTransform {

  transform(errors: any): string | null {
    if (!errors || typeof errors !== 'object') {
      return null;
    }
    
    // Get the first error key from the errors object
    const errorKeys = Object.keys(errors);
    return errorKeys.length > 0 ? errorKeys[0] : null;
  }

}