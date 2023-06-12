export const checkEmail = (email) => {
  // Check if value is null, empty or contains only white spaces
  if (
    email === undefined ||
    email === null ||
    email === "" ||
    !email.replace(/\s/g, "").length
  ) {
    return {
      isValid: false,
      text: "This field is mandatory!",
    };
  }
  if (email.includes(" ")) {
    email = email.trim();
  }
  let text;
  const isValid = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
  if (!isValid) {
    text = "Please provide a valid email address!";
  }
  return {
    isValid,
    text,
  };
};
