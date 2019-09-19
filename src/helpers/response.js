class Response {
  static errorResponse(status, code, message, field = null) {
    const errorResponse = { status, code, message, field };
    return { error: errorResponse };
  }

  static response(res, status, rows = null, count = null) {
    const payload = { rows };
    if (count) payload.count = count;
    return res.status(status).json(payload);
  }
}

export default Response;
