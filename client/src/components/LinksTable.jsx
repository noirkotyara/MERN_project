
import { Link } from "react-router-dom"


const LinksTable = (props) => {
  if(!props.linksList.length){
    return (<div>
      You don`t have links table
    </div>)
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>Short</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {props.linksList.map((link, index) => {
            return <tr key={index}>
              <td>{index}</td>
              <td>{link.to}</td>
              <td>{link.from}</td>
              <td> <Link to={`/details/${link._id}`}>Open</Link> </td>
            </tr>
          })}


        </tbody>
      </table>
    </div>)



}
export default LinksTable