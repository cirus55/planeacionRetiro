import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import API from '../../utils';

class FormPort extends Component {
    classes = {
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        input: {
          margin: "5px",
        }
      }


    //Setting the component's initial state
    state = {
        tickers: "",
        options: []
    };

    handleInputChange = event => {
        //Getting the value and name of the input which trigerred the change
        const { name, value } = event.target;

        if (value.length > 1) {
            API.getPorts(value).then(res => {
                //console.log(res.data)
                this.setState({
                    options: res.data
                })
            }
            );
        }

        //Updating the input's state
        this.setState({
            tickers: value
        });
    };

    handleSelectChange = event => {
        this.props.selectPort(event.target.selectedOptions[0].text);
    }

    handleClick = event => {
        event.preventDefault();
        //API.getPortsF(this.state).then(x => console.log("handle click",x));
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleClick}>
                    <input
                        value={this.state.tickers}
                        name="ticker"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Estrategias"
                    />
                    <br></br>
                    <br></br>
                    <select onChange={this.handleSelectChange}>
                        {
                            this.state.options.map((item) =>
                                <option
                                    value={item.strategy}
                                >
                                    {item.strategy}
                                </option>
                            )
                        }
                    </select>
                    {/* <Button variant="contained" color="primary" className={this.classes.button} type="submit">
                        Send
                        <Icon className={this.classes.rightIcon}>send</Icon>
                    </Button> */}
                </form>
            </div>
        );
    }
}

export default FormPort;