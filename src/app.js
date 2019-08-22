//TODO babel src/app.js --out-file=public/scripts/app.js --presets=env,react
//TODO live-server public
//! -----------------------------------------------------------------------

class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }

    // Delete Options
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    // Add Option
    handleAddOption(option) {

        if(!option) {
            return "Enter valid value to add!";
        } else if(this.state.options.indexOf(option) > -1) {
            return "Item is already listed!";
        } 

        this.setState((preState) => {
            return {
                options: preState.options.concat(option)
            }
        });
    }

    handlePick() {
        console.log(this.state.options);
    }

    render() {

        const title = "Indecision";
        const subtitle = "Put your life in the hands of AI!";
       

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick} 
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}


class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        )
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >What should I do?</button>
            </div>
        )
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions} >Remove All Options</button>
                {this.props.options.map(e => <Option key={e} optionText={e} />)}
            </div>
        )
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>{ this.props.optionText }</p>
            </div>
        )
    }
}

class AddOption extends React.Component {

    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {
                error
            }
        })

        e.target.elements.option.value = "";
    };

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}            
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
//! -----------------------------------------------------------------------

// // ---------- JSX - Javascript XML ...given to us by React! ----------
// const app = {
//     title: 'Indecision App',
//     subtitle: 'This is a React JSX app',
//     options: []
// };

// const onFormSubmit = e => {
//     e.preventDefault();
//     const option = e.target.elements.option.value;
//     if(option) {
//         app.options.push(option);
//         e.target.elements.option.value = "";
//         renderTheApp();
//     }
// };

// const resetOptions = () => { 
//     app.options = [];
//     renderTheApp();
// };

// const makeDecision = () => {
//     const randomNum = Math.floor(Math.random() * app.options.length);
//     const selected = app.options[randomNum];
//     alert(selected);
// };

// let toogleme = false;
// const showsecret = () => {
//     toogleme = !toogleme;
//     renderTheApp();
// };

// const appRoot = document.getElementById('app');

// const renderTheApp = () => {
//     const template = (
//         <div>
//             <h1>{app.title}</h1>
//             {app.subtitle && <p>{app.subtitle}</p>}
//             {app.options.length ? 'Here are your options:' : 'No options'}
//             <ol>
//             {app.options.map(e =>{
//                 return <li key={e}>{e}</li>
//             })}
//             </ol>
//             <form onSubmit={onFormSubmit}>
//             <input type="text" name="option" />
//             <button>Add Option</button>
//             </form>
//             <button onClick={resetOptions}>Remove Options</button>
//             <button disabled={!app.options.length} onClick={makeDecision}>What should I do?</button>
//             <h1>Show Me the secret!</h1>
//             <button onClick={showsecret}>{toogleme ? 'Hide' : 'Show'}</button>
//             {toogleme && <p>...and the secret is revealed!</p>}
//         </div>
//     );
//     ReactDOM.render(template, appRoot);
// }

// renderTheApp();