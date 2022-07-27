import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res, error) => {
    return res.json({error: error, status: 400});
  },
});