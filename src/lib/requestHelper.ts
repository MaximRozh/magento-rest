class Request {
  request: string;
  constructor() {
    this.request = "/";
  }
  init() {
    this.request = "/";
    return this;
  }
  emptyCriteria() {
    this.request = `${this.request}searchCriteria=?`;
    return this;
  }
  find(value: string) {
    this.request = `${this.request}${value}`;
    return this;
  }
  searchCriteria(
    field: string,
    value: string,
    condition: string,
    index: string | number,
    fieldIndex: string | number
  ) {
    this.request = `${this.request}${this.field(
      field,
      fieldIndex,
      index
    )}${this.value(value, fieldIndex, index)}${this.condition(
      condition,
      fieldIndex,
      index
    )}`;
    return this;
  }
  call(params: string) {
    this.request = `${this.request}${params}?`;
    return this;
  }
  send() {
    return this.request;
  }
  getFields(params: string) {
    this.request = `${this.request}fields=${params}`;
    return this;
  }

  pageSize(amount: number) {
    this.request = `${this.request}searchCriteria[pageSize]=${amount}&`;
    return this;
  }
  search(index: string | number) {
    return `searchCriteria[filter_groups][${index}]`;
  }
  field(field: string, fieldIndex: string | number, index: string | number) {
    return `${this.search(index)}[filters][${fieldIndex}][field]=${field}&`;
  }
  value(value: string, fieldIndex: string | number, index: string | number) {
    return `${this.search(index)}[filters][${fieldIndex}][value]=${value}&`;
  }
  condition(type: string, fieldIndex: string | number, index: string | number) {
    return type
      ? `${this.search(index)}[filters][${fieldIndex}][condition_type]=${type}&`
      : "";
  }
}

export default new Request();
