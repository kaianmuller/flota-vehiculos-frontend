export class ParamsPaginator{

    skip:string = '';
    take:string = '';

    constructor(skip:number,take:number){
        this.skip = skip.toString();
        this.take = take.toString();
    }
}