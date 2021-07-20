import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 140,
  },
  row: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-evenly',
    width: "35%",
    paddingBottom: "2%"
  },
  card: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  }
});

function Food() {
  const [food, setFood] = useState([])
  const [update, setUpdate] = useState(false)
  const classes = useStyles();
  const [currentName, setCurrentName] = useState('')
  const [currentServings, setCurrentServings] = useState(0)
  const [currentUrl, setCurrentUrl] = useState('')
  const foodURL = 'https://food-app-backend-server.herokuapp.com/food'
  

  useEffect(() => {
    let getFood = async () => {
      let response = await fetch(foodURL)
      let data = await response.json()
      console.log(data)
      setFood(data)
    }
    getFood()
  }, [update])
  
  async function deleteMeal(id){
    await fetch(foodURL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
  })
  .then(()=> setUpdate(false))
  }

  async function updateMeal(id, cal, cond){
    if (cond==='add'){
      cal++
    } else {
      cal--
    }
    await fetch(foodURL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, servings: cal })
  })
  .then(()=> setUpdate(false))
  }

  async function addMeal(){
    await fetch(foodURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: currentName, servings: currentServings, image_url: currentUrl})
  })
  .then(()=> setUpdate(false))
  .catch((err) => console.log('error' + err))
  console.log(currentName + 'hi')
  }
  
  const handleSubmit = (event) => {
    addMeal() // Save games when form is submitted
  }

  const handleNameChange = (event) => {
    setCurrentName(event.target.value)
    console.log(currentName)
  }
  const handleServingsChange = (event) => {
    setCurrentServings(event.target.value)
  }
  const handleUrlChange = (event) => {
    setCurrentUrl(event.target.value)
  }

  return (
    <>
      <h1>FEEEEED ME</h1>
      
      <form className={classes.row} onSubmit={handleSubmit}>
        <TextField id="name" onChange={handleNameChange} defaultValue="Food name"/>
        <TextField id="servings" onChange={handleServingsChange} defaultValue="Servings"/>
        <TextField id="url" onChange={handleUrlChange} defaultValue="Recipe Image Url" />
        <Button type='submit' variant="contained">Create new food</Button>
      </form>

      <div className={classes.card}>
        {food && food.map(meal => {
          return (
            <Card className={classes.root} key={meal.id}>
              <CardActionArea>
                  <CardMedia
                      component="img"
                      className={classes.media}
                      image={meal.image_url}
                      title={meal.name}
                  />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {meal.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Servings: {meal.servings}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Fab color="primary" aria-label="add">
                <AddIcon 
                  onClick={()=> {
                  updateMeal(meal.id, meal.servings, 'add')
                  setUpdate(true)
                }}/>
              </Fab>
              <Fab color="primary" aria-label="add">
                <RemoveIcon 
                  onClick={()=> {
                  updateMeal(meal.id, meal.servings, 'subtract')
                  setUpdate(true)
                }}/>
              </Fab>
              <Button size="small" color="primary" 
                      onClick={()=> {
                        deleteMeal(meal.id)
                        setUpdate(true)
                      }}>
                Delete
              </Button>
            </CardActions>
          </Card>
          )
        })}
      </div>
    </>
  )
}

export default Food