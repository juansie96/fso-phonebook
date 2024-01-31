const validateFields = (data, validationFields) => {
    const errors = []

    for (const validationField of validationFields) {
        const {name, type} = validationField
        if (!data[name]) {
            errors.push(`The field '${name}' is required`)
        } else if (typeof data[name] !== type) {
            errors.push(`The field '${name}' should be of type '${type}'`)
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

module.exports = validateFields