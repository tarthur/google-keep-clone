const validateTextFields = (text) => {
  if (text.length === 0 || text.replace(/\s/g,'') == '') {
    return null
  }

  return text;
}

export default validateTextFields;