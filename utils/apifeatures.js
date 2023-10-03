class APIFEATURE {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const { keyword } = this.queryString;
    const searchRegex = new RegExp(keyword, 'i');

    this.query = this.query.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
      ],
    });

    return this;
  }

  filter() {
    const { name, price, category } = this.queryString;

    if (name) {
      const nameRegex = new RegExp(name, 'i');
      this.query = this.query.find({ name: nameRegex });
    }

    if (price) {
      const minPrice = parseInt(price);
      this.query = this.query.find({ price: { $gte: minPrice } });
    }

    if (category) {
      this.query = this.query.find({ category });
    }

    return this;
  }

  pagination(resultPerPage) {
    const page = parseInt(this.queryString.page, 10) || 1;
    const skip = (page - 1) * resultPerPage;

    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}
  
  export default  APIFEATURE;
  