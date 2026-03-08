export class dbRepository {
    model;

    constructor(model){
        this.model = model
    }


    async create(item){
       return await this.model.create(item)
    }

    async getOne(filter,projection = {},options = {}){
        return await this.model.findOne(filter,projection,options)
    }
}