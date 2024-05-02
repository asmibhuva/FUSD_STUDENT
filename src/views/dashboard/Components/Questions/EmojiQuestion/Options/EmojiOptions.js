import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles(theme => ({
  option: {
    fontSize: "20px",
    color: "#3C4B64",
    padding: "20px 0px",
    textAlign: "center",
    display: "grid",
    gridTemplateColumns:"1fr",
    margin:"auto",
    border: "1px solid #fff",
    maxWidth: "350px",
    borderRadius: "10px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "22px",
    },
  },
  optionSelect: {

    border: "1px solid #3C4B64",

  },
  img: {
    [theme.breakpoints.down('sm')]: {
      padding: "10px 20px",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "20px 30px",
    },
    [theme.breakpoints.up('md')]: {
      padding: "30px 30px",
    },
    [theme.breakpoints.up('lg')]: {
      padding: "40px 40px",
    },
  },
}));

const EmojiOptions = ({
  optionData,
  selectedOption,
  setSelectedOption,
}) => {
  const classes = useStyles();

  return (
    <div
      style={{ cursor: "pointer" }}
      className={selectedOption === optionData.value ? classes.option + " " + classes.optionSelect : classes.option}
      onClick={() => setSelectedOption(optionData.value)}
    >
      <img src={optionData.image} className={`img-fluid ${classes.img}`} />
      {optionData.label}
    </div>
  )
}

export default EmojiOptions
