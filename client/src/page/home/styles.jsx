import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  image: {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  },
  "@media (max-width:800px)": {
    image: {
      display: "none",
    },
  },
}));
