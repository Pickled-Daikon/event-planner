import React from 'react';
import {Form, Button, TextArea} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput
} from 'semantic-ui-calendar-react';


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
        };
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    //promise
    //creaeve

    render() {
        return (
<>
            <Form>
                <TextArea rows={1} placeHolder='Name of event'/>
                <br/><br/>
                <TextArea rows={1} placeHolder='Description'/>
                <br/><br/>
                <DateInput
                    closable={true}
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <TimeInput
                    closable={true}

                    name="time"
                    placeholder="Time"
                    value={this.state.time}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        <br/>
            <Button> Add event
            </Button>
            </>

        );
    }
}

export default CreateEvent;
