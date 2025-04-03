import bcrypt from "bcrypt";

// Bcrypt
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validate the hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
