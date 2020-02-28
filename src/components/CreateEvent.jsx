import React from 'react';
import {Form, Button, TextArea, Header} from 'semantic-ui-react';
import createICS from "../api/createics";

import {
  DateInput,
  TimeInput
} from 'semantic-ui-calendar-react';
import {createEvent} from "../api/events";

export const CREATE_EVENT_STATUSES = {
    DEFAULT: 0,
    SUCCESS: 1,
    ERROR: 2
};

class CreateEvent extends React.Component {

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }));

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            date: '',
            startTime: '',
            endTime: '',
        };
    }

    onSubmit = () => {
        const {name, description, date, startTime, endTime} = this.state;

        const startDateObj = new Date(date);
        const endDateObj = new Date(date);

        // do work here setting month, day, hrs, etc

        startDateObj.setHours(startTime.slice(0, 2));

        startDateObj.setMinutes(startTime.slice(3, 5));
        endDateObj.setHours(endTime.slice(0, 2));
        endDateObj.setMinutes(endTime.slice(3, 5));


        const startDateStr = startDateObj.toString();
        const endDateStr = endDateObj.toString();

        createEvent({name, description, startDateTime: startDateStr, endDateTime: endDateStr})
            .then((newEvent) => {
                this.props.setCreateSuccess(CREATE_EVENT_STATUSES.SUCCESS);
                downloadIcsFile(newEvent);
            }).catch(() => {
                this.props.setCreateSuccess(CREATE_EVENT_STATUSES.ERROR);
        })
    };

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    render() {
        return (
          <>
            <Form>
              <Header as='h1'>Add an Event</Header>
                <TextArea name='name' value={this.state.name} onChange={this.handleChange} rows={1} placeholder='Name of event'/>
                <br/><br/>
                <TextArea name='description' value={this.state.description} onChange={this.handleChange} rows={1} placeholder='Description'/>
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

                    name="startTime"
                    placeholder="Time Start"
                    value={this.state.startTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <TimeInput
                    closable={true}

                    name="endTime"
                    placeholder="Time End"
                    value={this.state.endTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        <br/>
            <Button onClick={()=>{this.onSubmit(); this.toggleVisibility();}}> Add event
            </Button>
            </>
        );
    }
}

function downloadIcsFile(eventObj) {
  const fileContents = createICS(eventObj);
  const element = document.createElement("a");
  const file = new Blob([fileContents], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = eventObj.name + '.ics';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

export default CreateEvent;
