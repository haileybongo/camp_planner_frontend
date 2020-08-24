class Item {

    constructor(itemId, itemAttributes){
        this.id = itemId,
        this.list = itemAttributes.list
        this.name = itemAttributes.name
        Item.all.push(this)

    }

   renderList(){
        let listArray = this.list.split(", ")
        let listHTML = ``
        let i = 0

        for(const item in listArray){
           

            listHTML += `<li>${listArray[i]}</li>`;
            i = i + 1

        }

        return listHTML
    }

    static findById(id) {
        return this.all.find(item => item.id === id)
    }

}

Item.all = []