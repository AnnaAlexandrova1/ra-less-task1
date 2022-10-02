

class ListService {
    _api = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

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
    
   // transform = (items) => {}
    


}

export default ListService