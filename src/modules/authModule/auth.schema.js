import { celebrate, Joi, Segments } from "celebrate";

const jobRoleQuestionsSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    loginPassword: Joi.string().required().min(1),
    loginId: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
});

export {
  jobRoleQuestionsSchema,
  getAssessmentQuestionsSchema,
  getUserAssessmentsSchema,
  addTPSchema,
};
