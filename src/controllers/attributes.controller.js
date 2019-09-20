/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import models from '../database/models';
import { ModelHelpers, Response } from '../helpers';
import { flattenObject } from '../utils';

const { attribute, attributeValue, productAttribute } = models;
const attributeModelHelper = new ModelHelpers(attribute);
const attributeValueModelHelper = new ModelHelpers(attributeValue);
class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  // static async getAllAttributes(req, res, next) {
  //   // write code to get all attributes from the database here
  //   return res.status(200).json({ message: 'this works' });
  // }

  static async getAllAttributes(req, res, next) {
    try {
      const data = await attributeModelHelper.findMany();
      return Response.response(res, 200, data);
    } catch (error) {
      return Response.errorResponse(res, 204, 'ATTR_01', 'no attributes exist');
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    const { attributeId } = req.params;
    try {
      const data = await attributeModelHelper.findOne({ attribute_id: attributeId });
      return Response.response(res, 200, data);
    } catch (error) {
      return Response.errorResponse(res, 500, 'ATTR_05', 'no attributes with that id exists');
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    const { attributeId } = req.params;
    try {
      const data = await attributeValueModelHelper.findMany({ attribute_id: attributeId });
      return Response.response(res, 200, data);
    } catch (error) {
      return Response.errorResponse(res, 500, 'ATTR_05', 'no attributes with that id exists');
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    const { productId } = req.params;
    try {
      let data = await productAttribute.findAll({
        where: { product_id: productId },
        include: [
          {
            model: attributeValue,
            attributes: [['value', 'attribute_value'], 'attribute_value_id'],
            include: [
              {
                model: attribute,
                as: 'attribute_type',
                attributes: [['name', 'attribute_name']],
              },
            ],
          },
        ],
        attributes: [],
      });
      data = data.map(r => flattenObject(r.toJSON()));
      return Response.response(res, 200, data);
    } catch (error) {
      return Response.errorResponse(
        res,
        500,
        'ATTR_05',
        'no attribute values for that product Id exist'
      );
    }
  }
}

export default AttributeController;
