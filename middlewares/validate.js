import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res, error) => {
    return res.json({error: error.message, status: 400});
  },
});