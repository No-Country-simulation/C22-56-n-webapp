const rolMiddleware = (roles) => {
  // Asegurarse de que roles sea un array
  if (!Array.isArray(roles)) {
    throw new Error("El parámetro roles debe ser un arreglo de roles");
  }

  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "No Autenticado. Por favor, inicie sesión." });
    }

    // Verificar si el rol del usuario es permitido
    if (!roles.includes(req.user.rol)) {
      return res
        .status(403)
        .json({ message: "No Autorizado. No tiene los permisos necesarios." });
    }

    // Si el usuario está autenticado y tiene el rol adecuado, proceder con la siguiente acción
    next();
  };
};

export default rolMiddleware;
