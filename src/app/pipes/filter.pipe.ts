import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      console.log(post);
      console.log(arg);
      if(post.processExercise.nameExercise.toLowerCase().indexOf(arg.toLowerCase()) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}