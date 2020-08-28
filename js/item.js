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


function getItems(){
    fetch("http://localhost:3000/api/items")
    .then(response => response.json())
    .then(items => {
        for (const element of items.data){
            
            new Item(element.id, element.attributes)
        }
    })
}