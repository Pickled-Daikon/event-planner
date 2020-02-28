import React from 'react';
import {Grid, Header, Form, Button, TextArea} from 'semantic-ui-react';
import {
  DateInput,
  TimeInput
} from 'semantic-ui-calendar-react';
import {createEvent, getAllEvents} from "../api/events";



class CreateEvent extends React.Component {
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
        console.log(date);

        // do work here setting month, day, hrs, etc

        console.log(startDateObj.toString());


        startDateObj.setHours(startTime.slice(0, 2));
        console.log(startDateObj.toString());

        startDateObj.setMinutes(startTime.slice(3, 5));
        endDateObj.setHours(endTime.slice(0, 2));
        endDateObj.setMinutes(endTime.slice(3, 5));


        const startDateStr = startDateObj.toString();
        const endDateStr = endDateObj.toString();

        createEvent({name, description, startDateTime: startDateStr, endDateTime: endDateStr})
            .then((newDate) => {
                console.log(newDate);
                this.props.setCreateSuccess(true);
            }).then(() => {
                return getAllEvents();
        }).then((events) =>{
            console.log(events)
        })
            .catch((e) => {

            });
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
                    value={this.state.time}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <TimeInput
                    closable={true}

                    name="endTime"
                    placeholder="Time End"
                    value={this.state.time}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
            </Form>
        <br/>
            <Button onClick={()=>this.onSubmit()}> Add event
            </Button>
            </>

        );
    }
}

export default CreateEvent;
