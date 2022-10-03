

class ListService {
    _api = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
    _apiItem = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/'

    getResource = async (url) => {
        let res = await fetch(this._api);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }
    
    getAllItems = async () => {
        const res = await this.getResource(this._api)
        return res
    }

    getResItem = async (i) => {
        let res = await fetch(`${this._apiItem}${i}.json`);
        if (!res.ok) {
            throw new Error (`Could not fetch, status: ${res.status}`)
        }
        return await res.json()
    }

    getItem = async (id) => {
        const res = await this.getResItem(id)
        return res
    }
    
   // transform = (items) => {}
}

export default ListService