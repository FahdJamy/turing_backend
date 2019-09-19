class Response {
  static errorResponse(res, status, code, message, field = null) {
    const payload = { code, message };
    if (field) payload.count = field;
    return res.status(status).json(payload);
  }

  static response(res, status, data = null) {
    const payload = data;
    return res.status(status).json(payload);
  }
}

export default Response;
