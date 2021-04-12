
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import * as Icons from '@fortawesome/free-solid-svg-icons';

const LinksTable = (props) => {
  if(!props.linksList.length){
    return (<div>
      You don`t have links table
    </div>)
  }
  return (
    <div>
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "50px", textAlign: "center"}}>№</th>
            <th style={{width: "300px"}}>Shortened</th>
            <th style={{width: "400px"}}>Original</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {props.linksList.map((link, index) => {
            return <tr key={index}>
              <td style={{textAlign: "center"}}>{index + 1}</td>
              <td>{link.to}</td>
              <td><div style={{wordWrap: "break-word", padding: "5px" }}>{link.from}</div></td>
              <td> <Link to={`/details/${link._id}`}> 
              <span className="btn-floating btn-large black pulse">
                <FontAwesomeIcon icon={Icons.faFolderOpen} size="lg" color="white"/>
                </span>
                </Link> 
                </td>
            </tr>
          })}


        </tbody>
      </table>
    </div>)



}
export default LinksTable;