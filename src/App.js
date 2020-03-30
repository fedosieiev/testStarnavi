import React, { Component } from 'react';

import GameLow from './components/Game/gameLow';
import GameAverage from './components/Game/gameAverage';
import GameHigh from './components/Game/gameHigh';
import UserName from './components/UserName/username';
import UserInformation from  './components/UserInformation/userInformation';
import GameLevel from  './components/GameLevel/gameLevel';

export default class App extends Component {
   state = {
      sizeEasyMode: undefined,
      sizeNormalMode: undefined,
      sizeHardMode: undefined,

      delayTimeEasyMode: undefined,
      delayTimeNormalMode: undefined,
      delayTimeHardMode: undefined,
      userPoints: 0,
      computerScores: 0,
      userData: [],
      victory: " ",
      yourNameState: "",
      catchLevel:""
   }

   async componentDidMount() {
      const response = await
            fetch(`https:starnavi-frontend-test-task.herokuapp.com/game-settings`,
            )
      const gameSettings = await response.json();

      const responseUser = await
            fetch('https://starnavi-frontend-test-task.herokuapp.com/winners'
            )
      const userData = await responseUser.json();

      this.setState({
         sizeEasyMode: gameSettings.easyMode.field,
         sizeNormalMode: gameSettings.normalMode.field,
         sizeHardMode: gameSettings.hardMode.field,

         delayTimeEasyMode: gameSettings.easyMode.delay,
         delayTimeNormalMode: gameSettings.normalMode.delay,
         delayTimeHardMode: gameSettings.hardMode.delay,
         userData: userData,
         victory: "Winner in this game",
      })
   }
      dataTransfer = (value) => {
         this.setState({yourNameState: value})
      }

      caughtLevel = (value) => {
         this.setState({catchLevel: value})
      }

      user = () => {
         this.setState({userPoints: this.state.userPoints + 1})
      };

      computer = () => {
         this.setState({computerScores: this.state.computerScores + 1})
      };

   render() {

      const duel = ['duel1', 'duel2', 'duel3', 'duel4', 'duel5', 'duel6',
         'duel7', 'duel8', 'duel9', 'duel10', 'duel11', 'duel12', 'duel13',
         'duel14', 'duel15', 'duel16', 'duel17', 'duel18', 'duel19', 'duel20',
         'duel21', 'duel22', 'duel23', 'duel24', 'duel25'];

   const setBlue = () => {
      const randomNumber = duel[Math.floor(Math.random() * 25)];
      document.getElementById(randomNumber).style.backgroundColor = 'blue'
      const timer = setTimeout(() => {
         if (document.getElementById(randomNumber).style.backgroundColor === 'blue') {
            document.getElementById(randomNumber).style.backgroundColor = 'red'
         }
         if (document.getElementById(randomNumber).style.backgroundColor === 'red')
            this.computer();
         setBlue()
      }, this.state.catchLevel ==="low" ? this.state.delayTimeEasyMode : null
      ||  this.state.catchLevel ==="average" ? this.state.delayTimeNormalMode : null
      ||  this.state.catchLevel ==="high" ? this.state.delayTimeHardMode : null
      )
      if (this.state.computerScores > 12
          || this.state.userPoints > 12)
         clearTimeout(timer)
   }

   const setGreen = (e) => {
      const eventCell = e.target.style
      if (eventCell.backgroundColor === 'blue')
         eventCell.backgroundColor = 'green'
      if (eventCell.backgroundColor === 'green')
         this.user()
   }
      return (
            <div className="container">
               <div className="row">
                  <div className="col-8">
                     <div>
                        <h6>To start the game, select the game mode (difficulty level)</h6>
                        <h6>   in the drop-down list, enter the username and click "PLAY".</h6>
                     </div>
                     <div className ="d-flex">
                     <div className ="game-level">
                        <GameLevel
                        caughtLevel={this.caughtLevel}
                        />
                     </div>

                     <div className="user-name">
                        <UserName
                        yourNameState={this.state.yourNameState}
                        setBlue={setBlue}
                        dataTransfer={this.dataTransfer}
                        userPoints={this.state.userPoints}
                        computerScores={this.state.computerScores}
								/>
                     </div>
                  </div>

                     <div className="d-flex">
                        <div>
                          <h4>{(this.state.computerScores > 12
                                || this.state.userPoints > 12)
                                ? this.state.victory: ""}</h4>
                        </div>
                        <div>
                           <pre>   </pre>
                        </div>

                        <div>
                           <h4>{this.state.computerScores > 12 ? "Computer" : ""
                           ||
                           this.state.userPoints > 12 ? this.state.yourNameState : "" }</h4>
                        </div>

                     </div>

                     <div onClick={setGreen}
                              style={(this.state.catchLevel === 'low' ? {
                                       height: this.state.sizeEasyMode * 40 + 'px',
                                       width: this.state.sizeEasyMode * 40 + 'px',
                                       marginLeft: 60
                                    } :
                                    undefined)
                              ||
                              (this.state.catchLevel === 'average' ? {
                                       height: this.state.sizeNormalMode * 30 + 'px',
                                       width: this.state.sizeNormalMode * 30 + 'px',
                                       marginLeft: 40
                                    } :
                                    undefined)
                              ||
                              (this.state.catchLevel==='high'? {
                                       height: this.state.sizeHardMode * 30 + 'px',
                                        width: this.state.sizeHardMode * 30 + 'px',
                                        } :
                                      undefined)
                                    } >

                        {this.state.catchLevel === 'low' ?
                              <GameLow
                                    computerScores={this.state.computerScores}
                                    userPoints={this.state.userPoints}
                                    sizeEasyMode={this.state.sizeEasyMode}/>
                              : undefined
                        }

                        {this.state.catchLevel === 'average' ?
                        < GameAverage
                              computerScores={this.state.computerScores}
                              userPoints={this.state.userPoints}
                              sizeNormalMode={this.state.sizeNormalMode}/>
                           : undefined
                        }

                        {this.state.catchLevel === 'high' ?
                              < GameHigh
                                    computerScores={this.state.computerScores}
                                    userPoints={this.state.userPoints}
                                    sizeHardMode={this.state.sizeHardMode}/>
                              : undefined
                        }
                     </div>
                  </div>

                  <div className="col">
                     <UserInformation
                           dataTable={this.state.userData}
                     />
                  </div>

               </div>
            </div>
      )
   }
}




