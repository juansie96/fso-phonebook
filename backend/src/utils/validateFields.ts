export interface ValidationField {
  name: string;
  type: string;
}

const validateFields = (
  data: Record<string, any>,
  validationFields: ValidationField[]
) => {
  const errors = [];

  for (const validationField of validationFields) {
    const { name, type } = validationField;
    if (!data[name]) {
      errors.push(`The field '${name}' is required`);
    } else if (typeof data[name] !== type) {
      errors.push(`The field '${name}' should be of type '${type}'`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default validateFields;
