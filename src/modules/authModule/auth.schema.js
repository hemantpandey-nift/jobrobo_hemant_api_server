import { celebrate, Joi, Segments } from "celebrate";

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    loginPassword: Joi.string()
      .required()
      .min(3)
      .label("Login Password")
      .options({ errors: { wrap: { label: false } } }),
    loginId: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Login Id")
      .options({ errors: { wrap: { label: false } } }),
  }),
});

export { loginSchema };
