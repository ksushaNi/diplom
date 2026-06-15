import { makeAutoObservable } from "mobx"

export default class ProductStore {
    constructor() {
        this._types = []
        this._products = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._searchQuery = ''
        makeAutoObservable(this)
    }
    addProduct(newProduct) {
        this._products.push(newProduct)
    }
    setTypes(types) {
        this._types = types
    }
    setProducts(products) {
        this._products = products
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setSearchQuery(query) {
        this.searchQuery = query
    }
    get types() {
        return this._types
    }
    get products() {
        return this._products
    }
    get selectedType() {
        return this._selectedType
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}