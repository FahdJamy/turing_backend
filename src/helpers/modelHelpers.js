class ModelHelpers {
  constructor(model) {
    this.model = model;
  }

  async findOne(options) {
    const response = await this.model.findAll({
      limit: 1,
      where: { ...options },
    });
    return response;
  }

  async findMany(params, otherOptions = {}) {
    const response = await this.model.findAll({
      where: { ...params },
      ...otherOptions,
    });
    return response;
  }
}

export default ModelHelpers;
