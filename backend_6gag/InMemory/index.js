const _=require('lodash');
const _uuid=require('uuid');

class InMemoryStorage{

    constructor() {
         this.storage = {};
    }
    create(collectionName, item){
        if(!(collectionName in this.storage)) {
            this.storage[collectionName]=[];
        }
        let property_id=_uuid.v4();
        item.guid=property_id;
        this.storage[collectionName].push(
            {
                item
            }
        )
        console.log(item);
        return property_id;
    };

    find(collectionName,itemToSearch){
        if((collectionName in this.storage)) {
            return this.storage[collectionName].filter(element=>element.item.guid==itemToSearch);
        }
    };
    all(collectionName)
    {
        if(collectionName in this.storage)
            if(this.storage[collectionName])
                return this.storage[collectionName];
    };
    remove(collectionName){
        if((collectionName in this.storage)) {
            delete this.storage[collectionName];
        }
    }

}

module.exports.InMemoryStorage = InMemoryStorage;
