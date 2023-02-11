import AddNote from "./AddNote"
import Notes from "./Notes"

export const Home = (props) => {

  const theAlert = props.theAlert

  return (
    <>
      <AddNote theAlert = {theAlert}/>
      <Notes theAlert = {theAlert}/>
    </>
  )
}
