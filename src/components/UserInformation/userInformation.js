import React, {Component} from "react";


export default class UserInformation extends Component {

   render() {
      const dataTable=this.props.dataTable;
        return (
              <div>
                 <div>
                    <h2>LEADER BOARD</h2>
                 </div>
            <table className="table">
                <thead>
                <tr>
                    <th>winner</th>
                    <th>date</th>
                </tr>
                </thead>
                <tbody>
                {dataTable.map(p =>
                    <tr key={p.id}>
                        <td>{p.winner}</td>
                        <td>{p.date}</td>
                    </tr>
                )
                }
                </tbody>
            </table>
              </div>
    )
    }
   }