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
        this.storage[collectionName].push({item})
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
    findIndex(collectionName, itemId){
        if((collectionName in this.storage)) {
            for(let i=0;i<this.storage[collectionName].length;i++)
            {
                if(this.storage[collectionName][i].item.guid==itemId)
                    return i;
            }
        }
        return -1;
    };
    update(collectionName, item){
        console.log(item);
      if((collectionName in this.storage)){
          let index = this.findIndex(collectionName, item.guid);
          console.log(index);
          this.storage[collectionName][index].item.liked=item.liked+1;
          return this.storage[collectionName][index].item;
      }
    };

}

module.exports.InMemoryStorage = InMemoryStorage;
