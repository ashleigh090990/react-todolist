var EachToDoComponent = React.createClass({
  propTypes: {
    checkboxVarName: React.PropTypes.string
  },


  componentWillMount: function() {
    console.log('the each to do stuff will mount')
  },

  componentDidMount: function() {
    console.log('the each stuff stuff has mounted')
  },







  render: function() {
    return (
      <li
        className="to-do-component">
        <table>
          <tbody>
            <tr>
              <td
                className="to-do-value">
                {this.props.children}
              </td>
              <td>
                <input
                  className={this.props.checkboxVarName}
                  type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }
});



var ToDo = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      editedToDo: ''
    };
  },

  componentWillMount: function() {
    console.log('the to dos will mount')
  },

  componentDidMount: function() {
    console.log('the to do stuff has mounted')
  },



  edit: function() {
    this.setState({editing: true});
  },








  save: function(key) {
    
    console.log('HERE')
    console.log('children: ' + this.props.children)
    console.log('currentToDosList: ' + this.props.currentToDosList)
    console.log('HERE')


    this.props.callbackParent(this.state.currentToDosList);



    this.setState({editing: false});
  },




  whenChanged: function(element) {
    console.log(element.target.value)
    this.setState({currentToDosList: element.target.value});
  },














  renderEditing: function() {
    return (
      <EachToDoComponent  checkboxVarName="checkbox">
        <input 
          ref="newText"
          defaultValue={this.props.children}
          onChange={this.whenChanged} />
        <button
          className="fa fa-floppy-o"
          type="submit"
          onClick={this.save}></button>
      </EachToDoComponent>
    );
  },
  renderSaved: function() {
    return (
      <EachToDoComponent  checkboxVarName="checkbox">
        {this.props.children}
        <button
          className="fa fa-pencil"
          type="submit"
          onClick={this.edit}></button>
      </EachToDoComponent>
    );
  },
  render: function() {
    console.log('rendering to do component')
    if (this.state.editing === true) {
      return this.renderEditing();
    } else {
      return this.renderSaved();
    };
  }
});










var CompleteToDos = React.createClass({
  render: function() {
    return (
      <EachToDoComponent checkboxVarName="completedCheckbox">
        {this.props.children}
      </EachToDoComponent>
    );
  }
});











var List = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      completedTodos: []
    };
  },





  componentDidMount: function() {
    console.log('the list has mounted')
  },




  componentWillMount: function() {
    console.log('the list will mount')
  },



  add: function() {
    var addToList = document.getElementById('newTodoToAdd').value;
    if (addToList !== "") {
      var toDoList = this.state.todos.concat([addToList])
      this.setState({todos: toDoList}, function() {
        document.getElementById('newTodoToAdd').value = "";
        this.forceUpdate();
      });
    };
    console.log('List.add')
  },
  markComplete: function() {
    console.log('what am i doing')
    var completedTasks = this.state.completedTodos, currentToDos = this.state.todos, checkboxes = document.getElementsByClassName('checkbox');
    for (i=checkboxes.length-1; i>=0; i--) {
      if (checkboxes[i].checked) {
        completedTasks.push(currentToDos[i]);
        currentToDos.splice(i, 1);
        // checkboxes[i].checked = false;

        
      };
    };
    this.setState({completedTodos: completedTasks});
    this.setState({todos: currentToDos}, function() {
      this.forceUpdate();
    });
    console.log('List.markComplete')
    console.log('todos: ' + this.state.todos)
    console.log('completed: ' + this.state.completedTodos)
  },
  removeFromToDoAndCompleted: function(checkboxVarName, stateToUpdate, newState) {
    for (i=checkboxVarName.length-1; i>=0; i--) {
      if (checkboxVarName[i].checked) {
        newState.splice(i, 1);
        // checkboxVarName[i].checked = false;
      };
    };
    this.setState({stateToUpdate: newState});
  },
  remove: function() {
    var currentToDos = this.state.todos, currentCompletedTodos = this.state.completedTodos, checkboxes = document.getElementsByClassName('checkbox'), completedCheckboxes = document.getElementsByClassName('completedCheckbox');
    this.removeFromToDoAndCompleted(checkboxes, 'todos', currentToDos);
    this.removeFromToDoAndCompleted(completedCheckboxes, 'completedTodos', currentCompletedTodos);
  },











  onChildChanged: function(i, newState) {
    console.log('i=' + i)
    console.log('newState=' + newState)
    this.state.todos[i] = newState
    console.log(this.state.todos)
    this.forceUpdate()
  },
  






  







  eachTodo: function(todo, i) {
    return (
      <ToDo






        callbackParent={this.onChildChanged.bind(this, i)}



        currentToDosList={this.state.todos}

        key={i}>
        {todo}
      </ToDo>
    );
  },
  eachCompleted: function(completeItem, i) {
    return (
      <CompleteToDos
        key={i}>
        {completeItem}
      </CompleteToDos>
    );
  },
  render: function() {
    return (
      <div>
        <input
          id="newTodoToAdd"
          type="text" />
        <button
          className="fa fa-plus"
          type="submit"
          onClick={this.add}></button>
        <ul>
          Still to Do
          {this.state.todos.map(this.eachTodo)}
        </ul>
        <button
          className="fa fa-times"
          type="submit"
          onClick={this.remove}></button>
        <button
          className="fa fa-check"
          type="submit"
          onClick={this.markComplete}></button>
        <ul>
          Completed
          {this.state.completedTodos.map(this.eachCompleted)}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <List/>,
  document.getElementById('react-container')
);

// every time {this.state.todos} changes, we want to rerender the page