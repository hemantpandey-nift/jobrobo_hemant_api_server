import { celebrate, Joi, Segments } from "celebrate";

const getProductsSchema = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string().optional().allow(null, ""),
    category: Joi.number().integer().optional().allow(null, ""),
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
  }),
});

export { getProductsSchema };
